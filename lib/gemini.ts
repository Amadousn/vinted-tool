import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const MAX_RETRIES = 5

async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await fn()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : ""
      const is429 = message.includes("429") || message.includes("Too Many Requests") || message.includes("RESOURCE_EXHAUSTED")
      if (!is429 || attempt === MAX_RETRIES - 1) throw err
      const delay = Math.min(2000 * Math.pow(2, attempt), 30000)
      await new Promise((r) => setTimeout(r, delay))
    }
  }
  throw new Error("Max retries reached")
}

export async function editProductImage(
  imageBase64: string,
  mimeType: string,
  floorPrompt: string
): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-image",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    generationConfig: { responseModalities: ["image", "text"] } as any,
  })

  return withRetry(async () => {
    const result = await model.generateContent([
      { inlineData: { data: imageBase64, mimeType } },
      { text: floorPrompt },
    ])

    const parts = result.response.candidates?.[0]?.content?.parts ?? []
    for (const part of parts) {
      if (part.inlineData?.mimeType?.startsWith("image/")) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`
      }
    }
    throw new Error("No image returned by Gemini")
  })
}

export async function generateVintedDescription(
  imageBase64: string,
  mimeType: string,
  descPrompt: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

  return withRetry(async () => {
    const result = await model.generateContent([
      { inlineData: { data: imageBase64, mimeType } },
      { text: descPrompt },
    ])

    return result.response.text()
  })
}

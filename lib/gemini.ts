import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

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
  throw new Error("Aucune image retournée par Gemini")
}

export async function generateVintedDescription(
  imageBase64: string,
  mimeType: string,
  descPrompt: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

  const result = await model.generateContent([
    { inlineData: { data: imageBase64, mimeType } },
    { text: descPrompt },
  ])

  return result.response.text()
}

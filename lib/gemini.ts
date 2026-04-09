import { InferenceClient } from "@huggingface/inference"

const OPENROUTER_BASE = "https://openrouter.ai/api/v1"
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY!
const HF_KEY = process.env.HF_API_KEY!
const HF_IMAGE_MODEL = "black-forest-labs/FLUX.1-Kontext-dev"

const MAX_RETRIES = 5

async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await fn()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : ""
      const is429 = message.includes("429") || message.includes("Too Many Requests") || message.includes("rate") || message.includes("503")
      if (!is429 || attempt === MAX_RETRIES - 1) throw err
      const delay = Math.min(2000 * Math.pow(2, attempt), 30000)
      await new Promise((r) => setTimeout(r, delay))
    }
  }
  throw new Error("Max retries reached")
}

export async function editProductImage(
  imageBase64: string,
  _mimeType: string,
  floorPrompt: string
): Promise<string> {
  return withRetry(async () => {
    const client = new InferenceClient(HF_KEY)

    // Convert base64 to Blob for the SDK
    // imageBase64 may or may not have a data URL prefix
    const raw = imageBase64.includes(",") ? imageBase64.split(",")[1] : imageBase64
    const binary = Buffer.from(raw, "base64")
    const blob = new Blob([binary])

    const result: Blob = await client.imageToImage({
      model: HF_IMAGE_MODEL,
      provider: "wavespeed",
      inputs: blob,
      parameters: {
        prompt: floorPrompt,
      },
    })

    const buf = await result.arrayBuffer()
    const b64 = Buffer.from(buf).toString("base64")
    return `data:image/png;base64,${b64}`
  })
}

export async function generateVintedDescription(
  _imageBase64: string,
  _mimeType: string,
  descPrompt: string
): Promise<string> {
  return withRetry(async () => {
    const res = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-70b-instruct:free",
        messages: [
          { role: "user", content: descPrompt },
        ],
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`OpenRouter text error: ${res.status} ${text}`)
    }

    const json = await res.json()
    const content = json.choices?.[0]?.message?.content
    if (!content) throw new Error("No description returned by OpenRouter")
    return content
  })
}

import { NextRequest, NextResponse } from "next/server"
import { generateVintedDescription } from "@/lib/gemini"
import { DESC_PROMPT, Size } from "@/lib/prompts"

export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mimeType, size } = await req.json()
    const result = await generateVintedDescription(imageBase64, mimeType, DESC_PROMPT(size as Size))
    return NextResponse.json({ description: result })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur inconnue"
    console.error("generate-desc error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

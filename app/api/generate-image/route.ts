import { NextRequest, NextResponse } from "next/server"
import { editProductImage } from "@/lib/gemini"
import { buildFloorPrompt, FLOOR_BASE, FloorKey } from "@/lib/prompts"

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mimeType, floor, mainArticle } = await req.json()

    if (!FLOOR_BASE[floor as FloorKey]) {
      return NextResponse.json({ error: "Sol invalide" }, { status: 400 })
    }

    const prompt = buildFloorPrompt(floor as FloorKey, mainArticle)
    const result = await editProductImage(imageBase64, mimeType, prompt)
    return NextResponse.json({ image: result })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur inconnue"
    console.error("generate-image error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

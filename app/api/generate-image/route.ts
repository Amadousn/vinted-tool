import { NextRequest, NextResponse } from "next/server"
import { editProductImage } from "@/lib/gemini"
import { buildFloorPrompt, FLOOR_BASE, FloorKey } from "@/lib/prompts"

export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mimeType, floor, mainArticle, isBack } = await req.json()

    if (!FLOOR_BASE[floor as FloorKey]) {
      return NextResponse.json({ error: "Invalid floor" }, { status: 400 })
    }

    const prompt = buildFloorPrompt(floor as FloorKey, mainArticle, isBack)
    const result = await editProductImage(imageBase64, mimeType, prompt)
    return NextResponse.json({ image: result })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("generate-image error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

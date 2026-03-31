import { ArticleItem } from "@/store/useAppStore"

async function fileToBase64(file: File): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      const base64 = result.split(",")[1]
      resolve({ base64, mimeType: file.type })
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export async function generateArticle(
  article: ArticleItem,
  updateArticle: (id: string, data: Partial<ArticleItem>) => void
) {
  updateArticle(article.id, { status: "loading" })

  try {
    const { base64: frontBase64, mimeType } = await fileToBase64(article.frontFile)

    const imagePromise = fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64: frontBase64, mimeType, floor: article.floor, mainArticle: article.mainArticle }),
    }).then((r) => r.json())

    const descPromise = fetch("/api/generate-desc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64: frontBase64, mimeType, size: article.size }),
    }).then((r) => r.json())

    let backImagePromise: Promise<{ image?: string } | null> = Promise.resolve(null)
    if (article.backFile) {
      const { base64: backBase64, mimeType: backMime } = await fileToBase64(article.backFile)
      backImagePromise = fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: backBase64, mimeType: backMime, floor: article.floor, mainArticle: article.mainArticle }),
      }).then((r) => r.json())
    }

    const [imageResult, descResult, backImageResult] = await Promise.all([
      imagePromise,
      descPromise,
      backImagePromise,
    ])

    if (imageResult.error) throw new Error(imageResult.error)
    if (descResult.error) throw new Error(descResult.error)

    const generatedImages: string[] = [imageResult.image]
    if (backImageResult?.image) generatedImages.push(backImageResult.image)

    updateArticle(article.id, {
      status: "done",
      generatedImages,
      description: descResult.description,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur inconnue"
    updateArticle(article.id, { status: "error", error: message })
  }
}

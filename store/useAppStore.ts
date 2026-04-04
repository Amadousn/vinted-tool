import { create } from "zustand"
import { FloorKey, Size } from "@/lib/prompts"

export interface ArticleItem {
  id: string
  frontFile: File
  frontPreview: string
  backFile?: File
  backPreview?: string
  floor: FloorKey
  size: Size
  mainArticle: string
  generatedImages: string[]
  description: string
  status: "idle" | "loading" | "done" | "error"
  error?: string
}

interface AppStore {
  articles: ArticleItem[]
  addArticle: (front: File) => void
  updateArticle: (id: string, data: Partial<ArticleItem>) => void
  removeArticle: (id: string) => void
  clearAll: () => void
}

export const useAppStore = create<AppStore>((set) => ({
  articles: [],

  addArticle: (front) => {
    const id = crypto.randomUUID()
    set((s) => ({
      articles: [
        ...s.articles,
        {
          id,
          frontFile: front,
          frontPreview: URL.createObjectURL(front),
          floor: "default_flat",
          size: "M",
          mainArticle: "",
          generatedImages: [],
          description: "",
          status: "idle",
        },
      ],
    }))
  },

  updateArticle: (id, data) =>
    set((s) => ({
      articles: s.articles.map((a) => (a.id === id ? { ...a, ...data } : a)),
    })),

  removeArticle: (id) =>
    set((s) => ({ articles: s.articles.filter((a) => a.id !== id) })),

  clearAll: () => set({ articles: [] }),
}))

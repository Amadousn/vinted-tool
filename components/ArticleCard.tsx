"use client"

import { ArticleItem, useAppStore } from "@/store/useAppStore"
import { FLOOR_OPTIONS, FloorKey, Size } from "@/lib/prompts"
import { generateArticle } from "@/lib/generate"

const SIZES: Size[] = ["S", "M", "L", "XL"]

export default function ArticleCard({
  article,
  isSelected,
  onSelect,
}: {
  article: ArticleItem
  isSelected: boolean
  onSelect: () => void
}) {
  const { updateArticle, removeArticle } = useAppStore()

  const handleGenerate = (e: React.MouseEvent) => {
    e.stopPropagation()
    generateArticle(article, updateArticle)
  }

  const borderColor =
    article.status === "done"    ? "border-green-500/40" :
    article.status === "loading" ? "border-amber-400/40" :
    article.status === "error"   ? "border-red-500/40"   :
    isSelected                   ? "border-accent/50"    : "border-border"

  const accentLine =
    article.status === "done"    ? "bg-green-400" :
    article.status === "loading" ? "bg-amber-400" :
    article.status === "error"   ? "bg-red-500"   :
    isSelected                   ? "bg-accent"    : "bg-transparent"

  return (
    <div
      onClick={onSelect}
      className={[
        "relative bg-surface border cursor-pointer transition-all duration-200 hover:bg-surface2",
        borderColor,
        isSelected || article.status === "done" ? "glow-sm" : "",
      ].join(" ")}
    >
      {/* Left accent line */}
      <div className={["absolute top-0 left-0 w-0.5 h-full transition-all", accentLine].join(" ")} />

      <div className="p-4 grid gap-3.5 items-start pl-5"
        style={{ gridTemplateColumns: "96px 1fr auto" }}>

        {/* THUMBNAIL */}
        <div className="relative overflow-hidden bg-surface2 border border-border"
          style={{ width: 96, height: 96 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.frontPreview} alt="article" className="w-full h-full object-cover" />
          {/* Back indicator */}
          {article.backFile && (
            <div className="absolute bottom-1 right-1 bg-accent text-bg text-[8px] font-black px-1 tracking-wider">
              2P
            </div>
          )}
        </div>

        {/* META */}
        <div className="flex flex-col gap-2.5 min-w-0">
          {/* Title row */}
          <div>
            <div className="flex items-center gap-2 text-sm font-bold tracking-tight truncate">
              <div className={[
                "w-1.5 h-1.5 flex-shrink-0 transition-all",
                article.status === "done"    ? "bg-green-400 glow-sm" :
                article.status === "loading" ? "bg-amber-400 animate-pulse" :
                article.status === "error"   ? "bg-red-500"  : "bg-muted2",
              ].join(" ")} />
              <span className="truncate">{article.frontFile.name.replace(/\.[^.]+$/, "")}</span>
            </div>
            <div className="text-[10px] text-muted mt-0.5 uppercase tracking-[0.2em] font-mono pl-3.5">
              {article.status === "loading"
                ? "NEURAL PROC..."
                : `${FLOOR_OPTIONS.find((f) => f.key === article.floor)?.label.toUpperCase()} · TAILLE ${article.size}`}
            </div>
          </div>

          {/* FLOOR CHIPS */}
          <div className="flex flex-wrap gap-1">
            {FLOOR_OPTIONS.slice(0, 3).map((f) => (
              <button key={f.key}
                onClick={(e) => { e.stopPropagation(); updateArticle(article.id, { floor: f.key }) }}
                className={[
                  "text-[10px] font-bold px-2 py-0.5 border transition-all uppercase tracking-wider font-mono",
                  article.floor === f.key
                    ? "bg-accent border-accent text-bg"
                    : "bg-surface2 border-border text-muted hover:border-accent/40 hover:text-accent",
                ].join(" ")}
              >
                {f.label}
              </button>
            ))}
            <select
              onClick={(e) => e.stopPropagation()}
              value={article.floor}
              onChange={(e) => updateArticle(article.id, { floor: e.target.value as FloorKey })}
              className="text-[10px] px-2 py-0.5 border border-border bg-surface2 text-muted focus:outline-none focus:border-accent/40 font-mono uppercase tracking-wider"
            >
              {FLOOR_OPTIONS.map((f) => (
                <option key={f.key} value={f.key}>{f.label}</option>
              ))}
            </select>
          </div>

          {/* SIZE + BACK */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {SIZES.map((s) => (
                <button key={s}
                  onClick={(e) => { e.stopPropagation(); updateArticle(article.id, { size: s }) }}
                  className={[
                    "text-[10px] font-bold w-7 h-6 border transition-all font-mono",
                    article.size === s
                      ? "bg-accent border-accent text-bg"
                      : "bg-surface2 border-border text-muted hover:border-accent/40 hover:text-accent",
                  ].join(" ")}
                >
                  {s}
                </button>
              ))}
            </div>
            <BackToggle article={article} updateArticle={updateArticle} />
          </div>

          {/* PROGRESS BAR */}
          {article.status === "loading" && (
            <div className="h-px bg-surface2 overflow-hidden">
              <div className="h-full bg-accent progress-pulse" />
            </div>
          )}

          {/* ERROR */}
          {article.status === "error" && article.error && (
            <div className="text-[10px] text-red-400 font-mono uppercase tracking-wide bg-red-500/5 border border-red-500/20 px-2 py-1">
              ERR · {article.error}
            </div>
          )}
        </div>

        {/* ACTION */}
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={handleGenerate}
            disabled={article.status === "loading"}
            className={[
              "text-[11px] font-black px-3 py-2 border transition-all uppercase tracking-[0.15em]",
              article.status === "done"
                ? "bg-green-500/10 text-green-400 border-green-500/30"
                : article.status === "loading"
                ? "bg-surface2 text-muted border-border cursor-not-allowed"
                : "bg-accent text-bg border-accent hover:glow active:scale-95 btn-shimmer",
            ].join(" ")}
          >
            {article.status === "done" ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : article.status === "loading" ? (
              <div className="w-3 h-3 border border-muted border-t-accent rounded-full animate-spin" />
            ) : "GEN"}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); removeArticle(article.id) }}
            className="text-muted2 hover:text-red-400 transition-colors p-1"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function BackToggle({
  article, updateArticle,
}: {
  article: ArticleItem
  updateArticle: (id: string, data: Partial<ArticleItem>) => void
}) {
  const inputId = `back-${article.id}`

  if (article.backFile) {
    return (
      <button
        onClick={(e) => { e.stopPropagation(); updateArticle(article.id, { backFile: undefined, backPreview: undefined }) }}
        className="text-[10px] text-accent/80 hover:text-red-400 transition-colors font-mono flex items-center gap-1 uppercase tracking-wider border border-accent/20 px-2 py-0.5 bg-accent/5"
      >
        DOS ✓
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    )
  }

  return (
    <>
      <button
        onClick={(e) => { e.stopPropagation(); document.getElementById(inputId)?.click() }}
        className="text-[10px] text-muted hover:text-accent transition-colors border border-border px-2 py-0.5 hover:border-accent/40 font-mono uppercase tracking-wider"
      >
        + DOS
      </button>
      <input id={inputId} type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) updateArticle(article.id, { backFile: file, backPreview: URL.createObjectURL(file) })
        }} />
    </>
  )
}

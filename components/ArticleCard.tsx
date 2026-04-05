"use client"

import React from "react"
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
        style={{ gridTemplateColumns: "140px 1fr auto" }}>

        {/* THUMBNAILS: FRONT + BACK */}
        <div className="flex gap-1.5" style={{ width: 140 }}>
          {/* Front */}
          <div className="relative overflow-hidden bg-surface2 border border-border flex-1"
            style={{ height: 96 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={article.frontPreview} alt="front" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[7px] text-center text-white/70 font-mono uppercase tracking-widest py-px">
              Front
            </div>
          </div>
          {/* Back */}
          <BackZone article={article} updateArticle={updateArticle} />
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
                : `${FLOOR_OPTIONS.find((f) => f.key === article.floor)?.label.toUpperCase()} · SIZE ${article.size}`}
            </div>
          </div>

          {/* ARTICLE PRINCIPAL */}
          <input
            type="text"
            placeholder="Main item (e.g. corset, dress...)"
            value={article.mainArticle}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => updateArticle(article.id, { mainArticle: e.target.value })}
            className="w-full text-[11px] px-2 py-1 border border-border bg-surface2 text-text
              placeholder:text-muted2 focus:outline-none focus:border-accent/50
              font-mono tracking-wide"
          />

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

          {/* SIZE */}
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

function BackZone({
  article, updateArticle,
}: {
  article: ArticleItem
  updateArticle: (id: string, data: Partial<ArticleItem>) => void
}) {
  const inputId = `back-${article.id}`

  if (article.backFile && article.backPreview) {
    return (
      <div className="relative overflow-hidden bg-surface2 border border-accent/30 flex-1 group"
        style={{ height: 96 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.backPreview} alt="back" className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[7px] text-center text-white/70 font-mono uppercase tracking-widest py-px">
          Back
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); updateArticle(article.id, { backFile: undefined, backPreview: undefined }) }}
          className="absolute top-0.5 right-0.5 w-4 h-4 bg-black/60 hover:bg-red-500 text-white/80 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
        >
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    )
  }

  const [dragging, setDragging] = React.useState(false)

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      updateArticle(article.id, { backFile: file, backPreview: URL.createObjectURL(file) })
    }
  }

  return (
    <>
      <button
        onClick={(e) => { e.stopPropagation(); document.getElementById(inputId)?.click() }}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragging(true) }}
        onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setDragging(true) }}
        onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDragging(false) }}
        onDrop={(e) => {
          e.preventDefault(); e.stopPropagation(); setDragging(false)
          const file = e.dataTransfer.files?.[0]
          if (file) handleFile(file)
        }}
        className={[
          "flex-1 border border-dashed flex flex-col items-center justify-center gap-1 transition-all cursor-pointer group",
          dragging
            ? "border-accent bg-accent/10 scale-105"
            : "border-border hover:border-accent/50 bg-surface2/50 hover:bg-accent/5",
        ].join(" ")}
        style={{ height: 96 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
          className={dragging ? "text-accent" : "text-muted2 group-hover:text-accent transition-colors"}>
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <line x1="12" y1="8" x2="12" y2="16"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
        <span className={[
          "text-[7px] font-mono uppercase tracking-widest transition-colors",
          dragging ? "text-accent" : "text-muted2 group-hover:text-accent",
        ].join(" ")}>
          + Back
        </span>
      </button>
      <input id={inputId} type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }} />
    </>
  )
}

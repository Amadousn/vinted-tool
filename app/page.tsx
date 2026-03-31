"use client"

import { useState } from "react"
import { useAppStore } from "@/store/useAppStore"
import { FLOOR_OPTIONS, FloorKey, Size } from "@/lib/prompts"
import DropZone from "@/components/DropZone"
import ArticleCard from "@/components/ArticleCard"
import ResultPanel from "@/components/ResultPanel"
import { generateArticle } from "@/lib/generate"

export default function Home() {
  const { articles, clearAll, updateArticle } = useAppStore()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedArticle = articles.find((a) => a.id === selectedId) ?? articles[0] ?? null
  const pendingCount = articles.filter((a) => a.status === "idle").length
  const doneCount = articles.filter((a) => a.status === "done").length
  const loadingCount = articles.filter((a) => a.status === "loading").length

  const handleGenerateAll = () => {
    articles.filter((a) => a.status === "idle").forEach((a) => generateArticle(a, updateArticle))
  }

  return (
    <div className="min-h-screen bg-bg">

      {/* TOPBAR */}
      <header className="sticky top-0 z-50 h-14 border-b border-border bg-bg/95 backdrop-blur-xl
        flex items-center justify-between px-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="relative w-2.5 h-2.5">
            <div className="absolute inset-0 bg-accent flicker" />
            <div className="absolute inset-0 bg-accent animate-ping opacity-20" />
          </div>
          <span className="text-sm font-black tracking-[0.3em] uppercase neon-text flicker">VINTED TOOL</span>
          <span className="text-[9px] font-mono text-muted2 tracking-widest self-end mb-px">v2.0</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-400 animate-pulse" />
            <span className="text-[10px] font-mono text-green-400 tracking-widest uppercase">API·LIVE</span>
          </div>
          <div className="w-px h-3 bg-border2" />
          <span className="text-[10px] font-bold text-accent bg-accent/8 border border-accent/20
            px-2.5 py-1 tracking-widest font-mono uppercase">AI v2.0</span>
          <div className="w-px h-3 bg-border2" />
          {loadingCount > 0 ? (
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-mono text-amber-400 tracking-widest uppercase">{loadingCount} EN COURS</span>
            </div>
          ) : (
            <span className="text-[10px] text-muted font-mono tracking-widest uppercase">
              {articles.length} ARTICLE{articles.length !== 1 ? "S" : ""}
            </span>
          )}
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="grid min-h-[calc(100vh-56px)]" style={{ gridTemplateColumns: "1fr 400px" }}>

        {/* LEFT — INPUT */}
        <div className="border-r border-border overflow-y-auto max-h-[calc(100vh-56px)]">
          <div className="p-6 flex flex-col gap-5">

            {/* ── HERO — only when no articles ── */}
            {articles.length === 0 && (
              <div className="relative border border-border bg-surface overflow-hidden fade-up">
                {/* Decorative corner rotated squares */}
                <div className="absolute -right-10 -top-10 w-40 h-40 border border-accent/6 rotate-12 pointer-events-none" />
                <div className="absolute -right-5 -top-5 w-24 h-24 border border-accent/5 rotate-12 pointer-events-none" />
                <div className="absolute -left-8 -bottom-8 w-32 h-32 border border-accent/4 -rotate-6 pointer-events-none" />

                <div className="relative p-7 flex flex-col gap-6 items-center text-center">
                  {/* Eyebrow */}
                  <div className="flex items-center gap-2">
                    <div className="h-px w-5 bg-accent/50" />
                    <span className="text-[9px] font-mono text-accent/60 tracking-[0.35em] uppercase">
                      Neural Resell Engine · AI Photo Processing
                    </span>
                    <div className="h-px w-5 bg-accent/50" />
                  </div>

                  {/* Big title */}
                  <div>
                    <h1 className="text-6xl font-black leading-[0.9] tracking-tighter neon-text flicker">
                      VINTED<br/>TOOL
                    </h1>
                    <p className="text-sm text-muted mt-4 leading-relaxed max-w-md">
                      Retouche automatique du fond de tes photos + génération de description SEO
                      par l&apos;IA. Vends plus vite sur Vinted.
                    </p>
                  </div>

                  {/* Stats decoratifs */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { val: "2.5", unit: "Flash", label: "Modèle Image" },
                      { val: "5",   unit: "Fonds",  label: "Styles dispo" },
                      { val: "∞",   unit: "Articles",label: "Batch mode" },
                    ].map(({ val, unit, label }) => (
                      <div key={label} className="bg-surface2 border border-border p-3 text-center">
                        <div className="text-2xl font-black text-accent leading-none">{val}</div>
                        <div className="text-[10px] font-mono text-accent/60 tracking-widest uppercase mt-0.5">{unit}</div>
                        <div className="text-[9px] font-mono text-muted mt-1 tracking-wide">{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Workflow steps */}
                  <div className="flex flex-col gap-1.5">
                    <p className="text-[9px] font-mono text-muted2 tracking-[0.3em] uppercase mb-0.5">// COMMENT ÇA MARCHE</p>
                    {[
                      { n: "01", title: "IMPORTER",    desc: "Glisse tes photos d'articles (JPG, PNG, WEBP)", active: true },
                      { n: "02", title: "CONFIGURER",  desc: "Choisis le fond et la taille du vêtement",      active: false },
                      { n: "03", title: "GÉNÉRER",     desc: "L'IA retouche les photos + génère la description SEO",   active: false },
                    ].map((step) => (
                      <div key={step.n}
                        className={[
                          "flex items-center gap-4 p-3.5 border transition-colors group cursor-default",
                          step.active ? "border-accent/30 bg-accent/4" : "border-border bg-surface2 hover:border-border2",
                        ].join(" ")}>
                        <span className={[
                          "text-xl font-black font-mono w-8 leading-none shrink-0",
                          step.active ? "text-accent" : "text-muted2",
                        ].join(" ")}>{step.n}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black tracking-[0.15em] uppercase">{step.title}</p>
                          <p className="text-[11px] text-muted font-mono mt-0.5">{step.desc}</p>
                        </div>
                        <span className={[
                          "text-base font-mono shrink-0 transition-colors",
                          step.active ? "text-accent" : "text-muted2 group-hover:text-muted",
                        ].join(" ")}>›</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── IMPORT SECTION ── */}
            <SectionLabel tag="01">IMPORTER DES ARTICLES</SectionLabel>
            <DropZone />

            {/* Pipeline info — only when no articles */}
            {articles.length === 0 && (
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: "IMG.GEN", sublabel: "Neural Image Processing", dot: "bg-accent" },
                  { label: "TEXT.GEN", sublabel: "Neural Text Generation", dot: "bg-green-400" },
                ].map((item) => (
                  <div key={item.label} className="bg-surface2 border border-border p-3 flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 shrink-0 ${item.dot} animate-pulse`} />
                    <div>
                      <p className="text-[11px] font-black tracking-widest uppercase text-text">{item.label}</p>
                      <p className="text-[10px] font-mono text-muted mt-0.5">{item.sublabel}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── STATS ── */}
            {articles.length > 0 && (
              <div className="grid grid-cols-3 gap-1.5 fade-up">
                {[
                  { val: articles.length, label: "TOTAL",      color: "text-accent" },
                  { val: doneCount,       label: "GÉNÉRÉS",    color: "text-green-400" },
                  { val: pendingCount,    label: "EN ATTENTE", color: "text-text" },
                ].map(({ val, label, color }) => (
                  <div key={label} className="relative bg-surface2 border border-border p-4 text-center overflow-hidden">
                    <div className={`absolute inset-0 flex items-center justify-center text-7xl font-black opacity-[0.04] ${color} pointer-events-none select-none`}>{val}</div>
                    <div className={`text-4xl font-black tracking-tighter ${color} relative`}>{val}</div>
                    <div className="text-[10px] text-muted mt-1 font-mono uppercase tracking-widest">{label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* ── APPLY ALL ── */}
            {articles.length > 1 && (
              <BulkApply onApply={(floor, size) => {
                articles.forEach((a) => updateArticle(a.id, {
                  ...(floor ? { floor } : {}),
                  ...(size  ? { size  } : {}),
                }))
              }} />
            )}

            {/* ── ARTICLES ── */}
            {articles.length > 0 && (
              <>
                <SectionLabel tag="02">ARTICLES ({articles.length})</SectionLabel>
                <div className="flex flex-col gap-1.5">
                  {articles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      isSelected={article.id === selectedArticle?.id}
                      onSelect={() => setSelectedId(article.id)}
                    />
                  ))}
                </div>
              </>
            )}

            {/* ── ACTIONS ── */}
            {articles.length > 0 && (
              <div className="flex gap-2 pt-4 border-t border-border sticky bottom-0 bg-bg/95 backdrop-blur pb-1">
                <button
                  onClick={handleGenerateAll}
                  disabled={pendingCount === 0}
                  className={[
                    "flex-1 font-black text-sm py-3.5 tracking-[0.2em] uppercase",
                    "flex items-center justify-center gap-2.5 transition-all",
                    pendingCount > 0
                      ? "bg-accent text-bg hover:brightness-110 active:scale-[0.99] glow-lg btn-shimmer"
                      : "bg-surface2 text-muted border border-border cursor-not-allowed opacity-40",
                  ].join(" ")}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  GÉNÉRER TOUT
                  {pendingCount > 0 && (
                    <span className="font-mono text-[11px] opacity-60">({pendingCount})</span>
                  )}
                </button>
                <button
                  onClick={clearAll}
                  className="bg-surface2 text-muted border border-border px-5 py-3.5
                    hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/5
                    transition-colors text-[11px] font-mono uppercase tracking-widest"
                >
                  EFFACER
                </button>
              </div>
            )}

          </div>
        </div>

        {/* RIGHT — RESULT */}
        <ResultPanel article={selectedArticle} />
      </div>
    </div>
  )
}

function SectionLabel({ children, tag }: { children: React.ReactNode; tag?: string }) {
  return (
    <div className="flex items-center gap-2">
      {tag && <span className="text-[9px] font-mono text-accent/40 tracking-widest">[{tag}]</span>}
      <span className="text-[10px] font-bold text-muted tracking-widest uppercase font-mono">{children}</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}

const SIZES: Size[] = ["S", "M", "L", "XL"]

function BulkApply({ onApply }: { onApply: (floor: FloorKey | null, size: Size | null) => void }) {
  const [floor, setFloor] = useState<FloorKey | null>(null)
  const [size,  setSize]  = useState<Size | null>(null)

  const handleApply = () => {
    if (!floor && !size) return
    onApply(floor, size)
  }

  return (
    <div className="border border-accent/20 bg-accent/4 p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="w-1 h-1 bg-accent" />
        <span className="text-[10px] font-bold text-accent tracking-widest uppercase font-mono">
          Appliquer à tous les articles
        </span>
      </div>

      {/* FLOOR */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[9px] font-mono text-muted2 tracking-widest uppercase">Fond</span>
        <div className="flex flex-wrap gap-1">
          {FLOOR_OPTIONS.map((f) => (
            <button key={f.key}
              onClick={() => setFloor(floor === f.key ? null : f.key)}
              className={[
                "text-[10px] font-bold px-2 py-1 border transition-all uppercase tracking-wider font-mono",
                floor === f.key
                  ? "bg-accent border-accent text-bg"
                  : "bg-surface2 border-border text-muted hover:border-accent/40 hover:text-accent",
              ].join(" ")}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* SIZE */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[9px] font-mono text-muted2 tracking-widest uppercase">Taille</span>
        <div className="flex gap-1">
          {SIZES.map((s) => (
            <button key={s}
              onClick={() => setSize(size === s ? null : s)}
              className={[
                "text-[10px] font-bold w-9 h-7 border transition-all font-mono",
                size === s
                  ? "bg-accent border-accent text-bg"
                  : "bg-surface2 border-border text-muted hover:border-accent/40 hover:text-accent",
              ].join(" ")}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* APPLY */}
      <button
        onClick={handleApply}
        disabled={!floor && !size}
        className={[
          "w-full py-2 text-[11px] font-black tracking-[0.2em] uppercase font-mono border transition-all",
          floor || size
            ? "bg-accent text-bg border-accent hover:brightness-110 active:scale-[0.99]"
            : "bg-surface2 text-muted border-border opacity-40 cursor-not-allowed",
        ].join(" ")}
      >
        APPLIQUER À TOUS ({[floor && "fond", size && `T.${size}`].filter(Boolean).join(" + ")})
      </button>
    </div>
  )
}

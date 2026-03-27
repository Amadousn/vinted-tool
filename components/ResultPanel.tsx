"use client"

import { useState } from "react"
import { ArticleItem } from "@/store/useAppStore"
import { FLOOR_OPTIONS } from "@/lib/prompts"

export default function ResultPanel({ article }: { article: ArticleItem | null }) {
  const [activeImg, setActiveImg] = useState(0)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!article?.description) return
    navigator.clipboard.writeText(article.description)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = (url: string, index: number) => {
    const a = document.createElement("a")
    a.href = url
    a.download = `vinted-${article?.id}-${index === 0 ? "face" : "dos"}.jpg`
    a.click()
  }

  return (
    <div className="bg-surface flex flex-col max-h-[calc(100vh-56px)] overflow-hidden border-l border-border">

      {/* Panel header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface2 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono text-accent/50 tracking-widest">[OUTPUT]</span>
          <span className="text-[11px] font-bold text-muted tracking-widest uppercase font-mono">
            {article ? "Aperçu Résultat" : "Prêt à Générer"}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-accent animate-pulse" />
          <span className="text-[9px] font-mono text-accent/60 tracking-widest uppercase">AI·LIVE</span>
        </div>
      </div>

      {/* ─── EMPTY STATE ─── */}
      {!article && (
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">

          {/* Branding hero */}
          <div className="relative bg-surface2 border border-border p-6 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-accent/50" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-accent/50" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-accent/50" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-accent/50" />
            {/* Decorative diamond grid bg */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle, #c8ff00 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

            <div className="relative">
              <div className="w-14 h-14 border-2 border-accent/40 bg-accent/6 flex items-center justify-center mx-auto mb-4 glow-sm">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <p className="text-3xl font-black tracking-[0.15em] uppercase text-text leading-none">VINTED</p>
              <p className="text-3xl font-black tracking-[0.15em] uppercase neon-text leading-none">TOOL</p>
              <p className="text-[10px] font-mono text-muted mt-2.5 tracking-widest uppercase">
                Neural Resell Engine v2.0
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="bg-accent/4 border border-accent/25 p-3 flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-accent animate-pulse shrink-0" />
            <span className="text-[10px] font-mono text-accent/80 tracking-wide uppercase leading-relaxed">
              Système prêt — Importe un article pour démarrer
            </span>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-1 fade-up">
            <p className="text-[9px] font-mono text-muted2 tracking-[0.3em] uppercase mb-1">// FONCTIONNALITÉS</p>
            {[
              { icon: "▶", label: "RETOUCHE DE FOND",   desc: "Béton · Parquet · Damier · Moquette · Vinyle" },
              { icon: "▶", label: "DESCRIPTION SEO",    desc: "Titre · État · Matière · Prix suggéré · Hashtags" },
              { icon: "▶", label: "RECTO / VERSO",      desc: "Face + dos traités sur le même article" },
              { icon: "▶", label: "BATCH MODE",         desc: "Générer tous les articles d'un coup" },
            ].map((f) => (
              <div key={f.label}
                className="flex items-start gap-3 p-3 bg-surface2 border border-border hover:border-accent/20 transition-colors group">
                <span className="text-accent text-[10px] font-mono mt-0.5 group-hover:glow-sm shrink-0">{f.icon}</span>
                <div>
                  <p className="text-[11px] font-black tracking-wider uppercase">{f.label}</p>
                  <p className="text-[10px] font-mono text-muted mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Fonds disponibles */}
          <div className="flex flex-col gap-1">
            <p className="text-[9px] font-mono text-muted2 tracking-[0.3em] uppercase mb-1">// FONDS DISPONIBLES</p>
            <div className="grid grid-cols-2 gap-1">
              {FLOOR_OPTIONS.map((f) => (
                <div key={f.key}
                  className="bg-surface2 border border-border p-2.5 flex items-center gap-2 hover:border-accent/20 transition-colors">
                  <div className="w-1 h-1 bg-accent/50 shrink-0" />
                  <span className="text-[10px] font-mono text-muted uppercase tracking-wider">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech specs */}
          <div className="bg-surface2 border border-border">
            <div className="px-4 py-2.5 border-b border-border bg-bg/40">
              <p className="text-[9px] font-mono text-accent/40 tracking-[0.3em] uppercase">// MODÈLES IA UTILISÉS</p>
            </div>
            <div className="p-4 flex flex-col gap-0">
              {[
                { k: "IMAGE",    v: "Neural Image v2.5",      dot: "bg-accent" },
                { k: "TEXTE",    v: "Neural Text v2.0",       dot: "bg-green-400" },
                { k: "PIPELINE", v: "Neural Render v2.0",     dot: "bg-blue-400" },
              ].map(({ k, v, dot }) => (
                <div key={k} className="flex items-center justify-between py-2 border-t border-border first:border-0">
                  <div className="flex items-center gap-2">
                    <div className={`w-1 h-1 ${dot} animate-pulse`} />
                    <span className="text-[10px] font-mono text-muted2 tracking-widest">{k}</span>
                  </div>
                  <span className="text-[10px] font-mono text-accent/70">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-surface2 border border-border p-4">
            <p className="text-[9px] font-mono text-muted2 tracking-[0.3em] uppercase mb-3">// TIPS</p>
            {[
              "Photo sur fond neutre = meilleur résultat",
              "Ajouter la photo dos pour plus de détails",
              "Utilise le fond béton pour les sneakers",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2 py-1.5 border-t border-border first:border-0">
                <span className="text-accent/40 text-[10px] font-mono shrink-0 mt-px">#{String(i+1).padStart(2,"0")}</span>
                <p className="text-[10px] font-mono text-muted leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ─── RESULT STATE ─── */}
      {article && (
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">

          {/* Image name + floor */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className={[
                "w-1.5 h-1.5 flex-shrink-0",
                article.status === "done"    ? "bg-green-400 glow-sm" :
                article.status === "loading" ? "bg-amber-400 animate-pulse" :
                article.status === "error"   ? "bg-red-500" : "bg-muted2",
              ].join(" ")} />
              <span className="text-xs font-bold tracking-tight truncate uppercase">
                {article.frontFile.name.replace(/\.[^.]+$/, "")}
              </span>
            </div>
            <span className="text-[10px] text-accent border border-accent/25 bg-accent/8 px-2 py-0.5 font-mono uppercase tracking-widest flex-shrink-0 ml-2">
              {FLOOR_OPTIONS.find((f) => f.key === article?.floor)?.label}
            </span>
          </div>

          {/* IMAGE PREVIEW */}
          <div className={[
            "relative w-full aspect-square bg-surface2 border border-border",
            "flex items-center justify-center",
            article?.generatedImages?.[activeImg] ? "scan-overlay" : "",
            article?.status === "done" ? "glow-sm" : "",
          ].join(" ")}>
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-accent/60 z-10" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-accent/60 z-10" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-accent/60 z-10" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-accent/60 z-10" />

            {article?.generatedImages?.[activeImg] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={article.generatedImages[activeImg]} alt="résultat" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-3 text-muted2 p-8">
                <div className="w-14 h-14 border border-border2 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="0"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted text-center">
                  {article?.status === "loading" ? "NEURAL RENDER..." : "APPUIE SUR GEN"}
                </p>
              </div>
            )}

            <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1.5
              text-[9px] bg-bg/90 text-accent border border-accent/30 px-2 py-1 font-mono uppercase tracking-widest">
              <div className="w-1 h-1 bg-accent animate-pulse" />
              AI ENGINE
            </div>

            {article?.status === "loading" && (
              <div className="absolute inset-0 bg-bg/75 flex flex-col items-center justify-center gap-3 z-20">
                <div className="w-8 h-8 border-2 border-surface2 border-t-accent rounded-full animate-spin" />
                <span className="text-[10px] font-mono text-accent/70 uppercase tracking-widest animate-pulse">RENDERING...</span>
              </div>
            )}
          </div>

          {article?.generatedImages?.[activeImg] && (
            <div className="flex items-center gap-3 bg-surface2 border border-border px-3 py-2">
              <div className="w-1 h-1 bg-green-400" />
              <span className="text-[9px] font-mono text-muted uppercase tracking-widest">
                NEURAL RENDER · {FLOOR_OPTIONS.find(f => f.key === article?.floor)?.label.toUpperCase()}
              </span>
            </div>
          )}

          {article?.generatedImages && article.generatedImages.length > 1 && (
            <div className="grid grid-cols-2 gap-1.5">
              {article.generatedImages.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={["aspect-square overflow-hidden border transition-all",
                    activeImg === i ? "border-accent glow-sm" : "border-border hover:border-border2",
                  ].join(" ")}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {article?.generatedImages && article.generatedImages.length > 0 && (
            <button
              onClick={() => handleDownload(article.generatedImages[activeImg], activeImg)}
              className="w-full flex items-center justify-center gap-2.5
                text-[11px] font-black text-accent border-2 border-accent/40 bg-accent/6
                py-3 hover:bg-accent hover:text-bg hover:border-accent hover:glow
                transition-all uppercase tracking-[0.2em] font-mono"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              TÉLÉCHARGER L&apos;IMAGE
            </button>
          )}

          <div className="h-px bg-border" />

          {/* Description */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[9px] font-mono text-accent/50 tracking-widest">[DESC]</span>
              <span className="text-[11px] font-bold text-muted tracking-widest uppercase font-mono">Description Vinted</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="relative bg-surface2 border border-border">
              <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-bg/40">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 border border-border2" />
                  <div className="w-2 h-2 border border-border2" />
                  <div className="w-2 h-2 border border-border2" />
                </div>
                <button
                  onClick={handleCopy}
                  className={[
                    "text-[10px] font-black px-2.5 py-0.5 border transition-all font-mono uppercase tracking-wider",
                    copied
                      ? "bg-accent text-bg border-accent glow-sm"
                      : "bg-surface border-border text-muted hover:bg-accent hover:text-bg hover:border-accent",
                  ].join(" ")}
                >
                  {copied ? "✓ COPIÉ" : "COPIER"}
                </button>
              </div>

              {article?.description ? (
                <pre className="text-xs text-muted leading-relaxed whitespace-pre-wrap p-4 max-h-56 overflow-y-auto font-mono">
                  {article.description}
                </pre>
              ) : (
                <div className="text-[11px] text-muted2 py-8 text-center font-mono uppercase tracking-widest">
                  <span className="animate-pulse">_</span> Génère un article pour voir la description
                </div>
              )}

              {article?.description && (
                <div className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, transparent, #141414)" }} />
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

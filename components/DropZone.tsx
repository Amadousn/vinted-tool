"use client"

import { useCallback, useState } from "react"
import { useAppStore } from "@/store/useAppStore"

export default function DropZone() {
  const { addArticle } = useAppStore()
  const [dragging, setDragging] = useState(false)

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) addArticle(file)
    })
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => document.getElementById("main-file-input")?.click()}
      className={[
        "relative cursor-pointer select-none group",
        "flex flex-col items-center justify-center gap-5 px-8 py-12",
        "transition-all duration-300",
        dragging
          ? "bg-accent/5 border-march glow-sm"
          : "bg-surface border border-dashed border-border2 hover:border-accent/25 hover:bg-surface2",
      ].join(" ")}
    >
      {/* Corner brackets */}
      {(["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2",
         "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"] as const
      ).map((pos, i) => (
        <div key={i} className={[
          "absolute w-5 h-5 border-accent transition-all duration-300",
          pos,
          dragging ? "opacity-100" : "opacity-30 group-hover:opacity-60",
        ].join(" ")} />
      ))}

      {/* Decorative bg text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[80px] font-black text-accent/[0.025] tracking-widest select-none">
          UPLOAD
        </span>
      </div>

      {/* Icon */}
      <div className="relative z-10">
        <div className={[
          "w-16 h-16 border-2 flex items-center justify-center transition-all duration-300",
          dragging
            ? "border-accent bg-accent/15 glow"
            : "border-border2 bg-surface2 group-hover:border-accent/35 group-hover:bg-accent/5",
        ].join(" ")}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke={dragging ? "#c8ff00" : "currentColor"}
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            className={dragging ? "" : "text-muted group-hover:text-text transition-colors"}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        {dragging && (
          <div className="absolute inset-0 border-2 border-accent animate-ping opacity-30" />
        )}
      </div>

      {/* Text */}
      <div className="text-center z-10">
        <p className={[
          "text-xl font-black tracking-[0.3em] uppercase transition-all duration-300",
          dragging ? "neon-text" : "text-text group-hover:text-accent",
        ].join(" ")}>
          {dragging ? "DROP HERE" : "DRAG & DROP"}
        </p>
        <p className="text-xs font-mono text-muted mt-2 tracking-[0.2em] uppercase">
          {dragging ? "Release to import" : "Your item photos — multi-file supported"}
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 w-full max-w-[220px] z-10">
        <div className="flex-1 h-px bg-border" />
        <span className="text-[10px] font-mono text-muted2 tracking-[0.25em] uppercase">or click</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Format badges */}
      <div className="flex items-center gap-2 z-10">
        {["JPG", "PNG", "WEBP"].map((fmt) => (
          <span key={fmt}
            className="text-[10px] font-mono border border-border text-muted2 px-2.5 py-1 tracking-widest uppercase">
            {fmt}
          </span>
        ))}
        <span className="text-[10px] font-mono text-muted2 tracking-wider">— MULTI</span>
      </div>

      <input id="main-file-input" type="file"
        accept="image/jpeg,image/png,image/webp" multiple className="hidden"
        onChange={(e) => handleFiles(e.target.files)} />
    </div>
  )
}

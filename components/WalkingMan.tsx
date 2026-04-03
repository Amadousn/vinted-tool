export default function WalkingMan() {
  return (
    <>
      <style>{`
        @keyframes wm-across {
          from { transform: translateX(-120px); }
          to   { transform: translateX(calc(100vw - 400px + 120px)); }
        }
        @keyframes wm-leg-l {
          0%, 100% { transform: rotate(30deg); }
          50%       { transform: rotate(-35deg); }
        }
        @keyframes wm-leg-r {
          0%, 100% { transform: rotate(-35deg); }
          50%       { transform: rotate(30deg); }
        }
        @keyframes wm-arm-r {
          0%, 100% { transform: rotate(-25deg); }
          50%       { transform: rotate(25deg); }
        }
        @keyframes wm-bill {
          0%   { transform: translateY(0px) rotate(-15deg); opacity: 1; }
          100% { transform: translateY(60px) rotate(40deg); opacity: 0; }
        }
        .wm-root {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          height: 90px;
          pointer-events: none;
          overflow: hidden;
          z-index: 9999;
        }
        .wm-char {
          position: absolute;
          bottom: 0; left: 0;
          animation: wm-across 14s linear infinite;
        }
        .wm-leg-l {
          transform-box: fill-box;
          transform-origin: 100% 0%;
          animation: wm-leg-l 0.42s ease-in-out infinite;
        }
        .wm-leg-r {
          transform-box: fill-box;
          transform-origin: 0% 0%;
          animation: wm-leg-r 0.42s ease-in-out infinite;
        }
        .wm-arm-r {
          transform-box: fill-box;
          transform-origin: 0% 0%;
          animation: wm-arm-r 0.42s ease-in-out infinite;
        }
        .wm-bill {
          position: absolute;
          font-size: 11px;
          font-weight: bold;
          font-family: monospace;
          color: #c8ff00;
          animation: wm-bill 1.1s ease-in infinite;
          user-select: none;
        }
      `}</style>

      <div className="wm-root" style={{ right: 400 }}>
        {/* ground glow */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(200,255,0,0.15), transparent)",
        }} />

        <div className="wm-char">
          {/* Bills falling from briefcase */}
          {[
            { left: -2,  top: 35, delay: 0    },
            { left: -10, top: 38, delay: 0.27 },
            { left: -18, top: 32, delay: 0.54 },
            { left: -6,  top: 40, delay: 0.81 },
            { left: -14, top: 34, delay: 1.08 },
            { left: -22, top: 37, delay: 1.35 },
          ].map((b, i) => (
            <div key={i} className="wm-bill"
              style={{ left: b.left, top: b.top, animationDelay: `${b.delay}s` }}>
              $
            </div>
          ))}

          <svg width="56" height="90" viewBox="0 0 56 90" fill="none">
            {/* Shadow */}
            <ellipse cx="28" cy="87" rx="14" ry="2.5" fill="rgba(200,255,0,0.08)" />

            {/* HEAD */}
            <circle cx="28" cy="9" r="8" fill="#c8ff00" />
            <circle cx="25" cy="8"  r="1.3" fill="#080808" />
            <circle cx="31" cy="8"  r="1.3" fill="#080808" />
            <path d="M24 11.5 Q28 15 32 11.5" stroke="#080808" strokeWidth="1.3" fill="none" strokeLinecap="round" />

            {/* BODY */}
            <rect x="20" y="18" width="16" height="21" rx="2" fill="#7aaa00" />
            <line x1="28" y1="18" x2="28" y2="39" stroke="#c8ff00" strokeWidth="0.8" opacity="0.4" />

            {/* LEFT ARM + BRIEFCASE (static) */}
            <line x1="21" y1="23" x2="9" y2="35" stroke="#c8ff00" strokeWidth="3" strokeLinecap="round" />
            <rect x="2"  y="33" width="12" height="9"  rx="1.5" fill="#c8ff00" />
            <path d="M5 33 Q8 29 11 33" stroke="#c8ff00" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <line x1="2" y1="37.5" x2="14" y2="37.5" stroke="#7aaa00" strokeWidth="1" />
            {/* Bills sticking out */}
            <rect x="3"  y="29" width="4" height="5" rx="0.5" fill="#a8ff50" opacity="0.9" />
            <rect x="7.5" y="27.5" width="3" height="5.5" rx="0.5" fill="#a8ff50" opacity="0.7" />

            {/* RIGHT ARM (swinging) */}
            <g className="wm-arm-r">
              <line x1="35" y1="23" x2="47" y2="35" stroke="#c8ff00" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* HIPS */}
            <rect x="20" y="38" width="16" height="8" rx="1" fill="#4a7000" />

            {/* LEFT LEG */}
            <g className="wm-leg-l">
              <line x1="23" y1="46" x2="16" y2="63" stroke="#c8ff00" strokeWidth="3"   strokeLinecap="round" />
              <line x1="16" y1="63" x2="11" y2="78" stroke="#c8ff00" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="5"  y="76" width="11" height="5" rx="1.5" fill="#c8ff00" />
            </g>

            {/* RIGHT LEG */}
            <g className="wm-leg-r">
              <line x1="33" y1="46" x2="40" y2="63" stroke="#c8ff00" strokeWidth="3"   strokeLinecap="round" />
              <line x1="40" y1="63" x2="45" y2="78" stroke="#c8ff00" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="40" y="76" width="11" height="5" rx="1.5" fill="#c8ff00" />
            </g>
          </svg>
        </div>
      </div>
    </>
  )
}

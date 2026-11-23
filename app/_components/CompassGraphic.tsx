import { useId } from 'react'

// Deterministic, rounded positions keep server and client markup identical.
const round = (n: number) => Math.round(n * 100) / 100
export const compassPoints = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2
  return { x: round(300 + Math.cos(angle) * 170), y: round(300 + Math.sin(angle) * 170), dx: round(Math.sin(i * 7.3) * 120), dy: round(Math.cos(i * 4.7) * 110) }
})

const milestones = [{ x: 150, y: 460 }, { x: 240, y: 340 }, { x: 360, y: 220 }, { x: 450, y: 220 }]

/** The Northeia compass. Colours come from CSS variables so it can change tone between sections. */
export default function CompassGraphic({ className = '' }: { className?: string }) {
  const gradient = `compass-needle-${useId().replace(/:/g, '')}`
  return (
    <svg className={`compass-graphic ${className}`} viewBox="0 0 600 600" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradient} x1="270" y1="150" x2="320" y2="400" gradientUnits="userSpaceOnUse">
          <stop className="compass-stop-a" />
          <stop className="compass-stop-b" offset="1" />
        </linearGradient>
      </defs>
      <g className="compass-orbits">
        <circle cx="300" cy="300" r="235" strokeOpacity=".22" />
        <circle cx="300" cy="300" r="210" strokeOpacity=".45" strokeDasharray="1 12" />
        <circle cx="300" cy="300" r="170" strokeOpacity=".3" />
        <circle cx="300" cy="300" r="112" strokeOpacity=".35" />
        <path d="M300 45v510M45 300h510" strokeOpacity=".2" strokeDasharray="3 8" />
        <path d="M65 300a235 235 0 0 1 235-235" strokeOpacity=".85" />
      </g>
      {compassPoints.map((point, i) => <circle className={`compass-point ${i % 3 === 0 ? 'is-major' : ''}`} key={i} cx={point.x} cy={point.y} r={i % 3 === 0 ? 4 : 2} />)}
      <path className="compass-path" d="M150 460H240V340H360V220H450" pathLength="1" strokeDasharray="1" />
      {milestones.map(({ x, y }, i) => <g key={i} className="compass-milestone"><circle className="compass-milestone-ring" cx={x} cy={y} r="12" /><circle className="compass-milestone-dot" cx={x} cy={y} r="3" /></g>)}
      <g className="compass-needle">
        <path d="M300 150 330 300 300 280 270 300Z" fill={`url(#${gradient})`} />
        <path className="compass-needle-south" d="M300 425 330 300 300 320 270 300Z" />
        <circle className="compass-hub" cx="300" cy="300" r="8" />
      </g>
      <text className="compass-north" x="300" y="35" textAnchor="middle" fontSize="12" letterSpacing="3">N</text>
    </svg>
  )
}

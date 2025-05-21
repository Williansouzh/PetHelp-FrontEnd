interface PlaceholderImageProps {
  width: number
  height: number
  alt: string
  className?: string
}

export default function PlaceholderImage({ width, height, alt, className }: PlaceholderImageProps) {
  // Gera uma cor de fundo aleatória suave
  const bgColor = `hsla(${Math.random() * 360}, 70%, 80%, 1)`

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className || ""}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: bgColor,
        borderRadius: "0.5rem",
      }}
    >
      <svg
        width={width / 3}
        height={height / 3}
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    </div>
  )
}

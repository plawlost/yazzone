interface BookProps {
  title: string
  author?: string
  color?: string
  textColor?: string
  recommended?: boolean
}

const bookmarkColors = [
  { main: '#D4AF37', shadow: '#B8960C', highlight: '#F4E4A6' }, // Gold
  { main: '#8B0000', shadow: '#5C0000', highlight: '#CD5C5C' }, // Deep red
  { main: '#1C3D5A', shadow: '#0F2538', highlight: '#3A6B8C' }, // Navy
  { main: '#2E4A3E', shadow: '#1A2D26', highlight: '#4A7B62' }, // Forest
  { main: '#4A3728', shadow: '#2D211A', highlight: '#7A5D4A' }, // Brown
]

function getBookmarkColor(title: string) {
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return bookmarkColors[hash % bookmarkColors.length]
}

export function Book({
  title,
  author,
  color = "#9D2127",
  textColor = "white",
  recommended = false,
}: BookProps) {
  const width = 140
  const height = width * (60 / 49)
  const pageDepth = 24
  const ribbon = recommended ? getBookmarkColor(title) : null

  return (
    <div 
      className="inline-block shrink-0 relative" 
      style={{ 
        perspective: 1000,
        width,
        height,
      }}
    >
      <div
        className="relative w-full h-full"
        style={{ 
          transformStyle: "preserve-3d",
          transform: "rotateY(-14deg) rotateX(2deg)",
        }}
      >
        {/* Bookmark ribbon - classic swallowtail shape */}
        {recommended && ribbon && (
          <svg
            className="absolute"
            width="14"
            height="45"
            viewBox="0 0 14 45"
            style={{
              top: -8,
              right: 18,
              zIndex: 30,
              filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.35))',
            }}
          >
            <defs>
              <linearGradient id={`ribbon-${title.replace(/\s/g, '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={ribbon.shadow} />
                <stop offset="25%" stopColor={ribbon.main} />
                <stop offset="50%" stopColor={ribbon.highlight} />
                <stop offset="75%" stopColor={ribbon.main} />
                <stop offset="100%" stopColor={ribbon.shadow} />
              </linearGradient>
            </defs>
            {/* Swallowtail ribbon - forked end */}
            <path
              d="M0,0 L14,0 L14,38 L7,32 L0,38 Z"
              fill={`url(#ribbon-${title.replace(/\s/g, '')})`}
            />
            {/* Fabric texture */}
            <path d="M3,2 L3,35" stroke={ribbon.shadow} strokeWidth="0.4" opacity="0.25" />
            <path d="M7,2 L7,30" stroke={ribbon.highlight} strokeWidth="0.6" opacity="0.15" />
            <path d="M11,2 L11,35" stroke={ribbon.shadow} strokeWidth="0.4" opacity="0.25" />
          </svg>
        )}

        {/* Front cover */}
        <div
          className="absolute inset-0 rounded-l-[3px] rounded-r-[1px] overflow-hidden"
          style={{ 
            background: color,
            transformStyle: "preserve-3d",
            boxShadow: `
              0 1px 2px rgba(0,0,0,0.07),
              0 4px 8px rgba(0,0,0,0.07),
              0 8px 16px rgba(0,0,0,0.05),
              0 16px 32px rgba(0,0,0,0.05)
            `,
          }}
        >
          {/* Spine — left edge with realistic book binding look */}
          <div 
            className="absolute left-0 top-0 h-full"
            style={{
              width: '10%',
              background: `linear-gradient(90deg, 
                rgba(0,0,0,0.15) 0%, 
                rgba(0,0,0,0.08) 20%,
                rgba(255,255,255,0.1) 40%,
                rgba(0,0,0,0.03) 60%,
                transparent 100%
              )`,
            }}
          />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-3 pl-[18px] pb-4">
            <span
              className="text-[13px] leading-[1.2] font-semibold tracking-[-0.01em]"
              style={{ 
                color: textColor,
                textShadow: textColor === 'white' ? '0 1px 2px rgba(0,0,0,0.2)' : 'none',
              }}
            >
              {title}
            </span>
            {author && (
              <span 
                className="mt-1.5 text-[10px] font-medium"
                style={{ 
                  color: textColor,
                  opacity: 0.7,
                }}
              >
                {author}
              </span>
            )}
          </div>

          {/* Paper texture overlay */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-soft-light"
            style={{
              opacity: 0.4,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
          
          {/* Top edge highlight */}
          <div 
            className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 8%, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.15) 80%, transparent 100%)',
            }}
          />
          
          {/* Inner border for depth */}
          <div 
            className="absolute inset-0 rounded-l-[3px] rounded-r-[1px] pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)',
            }}
          />
        </div>

        {/* Pages — right edge with individual page lines */}
        <div
          className="absolute top-[2px] rounded-r-[1px]"
          style={{
            height: height - 4,
            width: pageDepth,
            right: -pageDepth + 1,
            transform: `rotateY(90deg)`,
            transformOrigin: "left center",
            background: `
              linear-gradient(90deg, 
                #c0c0c0 0%, 
                #f8f8f8 8%, 
                #ffffff 15%,
                #fafafa 50%,
                #f5f5f5 85%,
                #e8e8e8 100%
              )
            `,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.05)',
          }}
        >
          {/* Page lines */}
          <div 
            className="absolute inset-0"
            style={{
              background: `repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 2px,
                rgba(0,0,0,0.03) 2px,
                rgba(0,0,0,0.03) 3px
              )`,
            }}
          />
        </div>
        
        {/* Back cover */}
        <div
          className="absolute inset-0 rounded-l-[3px] rounded-r-[1px]"
          style={{ 
            background: color,
            filter: "brightness(0.65)",
            transform: `translateZ(-${pageDepth}px)`,
          }}
        />
      </div>
    </div>
  )
}

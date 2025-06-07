import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Yagiz E. Celebi'

  const fontData = await fetch(
    new URL('https://assets.yaz.zone/Geist-Bold.otf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  const favicon = await fetch(new URL('https://yaz.zone/favicon.ico', import.meta.url)).then(
    (res) => res.arrayBuffer()
  )

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          color: '#e5e5e5',
          fontFamily: '"Geist"',
          padding: '40px',
        }}
      >
        <img
          // @ts-ignore
          src={favicon}
          alt="Favicon"
          width={80}
          height={80}
          style={{
            borderRadius: '50%',
            marginBottom: '20px',
            border: '2px solid #262626',
          }}
        />
        <h1
          style={{
            fontSize: '60px',
            fontWeight: 700,
            lineHeight: 1.1,
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: '28px',
            marginTop: '20px',
            color: '#a3a3a3',
          }}
        >
          Yagiz E. Celebi
        </p>
        <p
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '24px',
            color: '#525252',
          }}
        >
          yaz.zone
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Geist',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}

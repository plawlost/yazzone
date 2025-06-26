import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const [geistRegular, geistBold] = await Promise.all([
    fetch(new URL('../../../public/Geist-Regular.otf', import.meta.url)).then((res) => res.arrayBuffer()),
    fetch(new URL('../../../public/Geist-Bold.otf', import.meta.url)).then((res) => res.arrayBuffer()),
  ])

  try {
    const { searchParams } = new URL(request.url)

    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Founder, Thinker, Nonconformist.'

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
            backgroundColor: 'black',
            color: 'white',
            fontFamily: '"Geist"',
            padding: '40px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 40,
              display: 'flex',
              alignItems: 'center',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            Yagiz E. Celebi
          </div>

          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.1,
              textAlign: 'center',
              maxWidth: 1000,
            }}
          >
            {title}
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 40,
              right: 40,
              display: 'flex',
              alignItems: 'center',
              fontSize: 20,
              color: '#999'
            }}
          >
            yaz.one
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Geist',
            data: geistRegular,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Geist',
            data: geistBold,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}

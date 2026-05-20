import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI 사주 운세',
  description: '생년월일로 알아보는 AI 사주 운세',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: 'sans-serif', background: '#f5f5f5', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  )
}

import './globals.css'

export const metadata = {
  title: 'HOPE Fusion Mission Control',
  description: 'Interactive mission control prototype for Lightning Fusion'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

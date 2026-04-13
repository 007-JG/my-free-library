import Script from 'next/script' // Naya import

export const metadata = {
  title: 'The Brightway Library | AI Book DNA & Newspapers',
  description: 'Read free books, access AI-powered book summaries, and daily newspapers.',
  verification: {
    google: '6BSVO6G_H08dt_uJWpDcf9P82Gwj9UYNDviLHqqHM1Y', 
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* --- ADSENSE GLOBAL SCRIPT --- */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6453585356934687"
          crossorigin="anonymous"
          strategy="afterInteractive" // Site load hone ke baad load hoga (Best for speed)
        />
      </head>
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  )
}

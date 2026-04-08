// app/layout.js

export const metadata = {
  title: 'The Brightway Library | AI Book DNA & Newspapers',
  description: 'Read free books, access AI-powered book summaries, and daily newspapers.',
  verification: {
    // POORA TAG NAHI, SIRF CODE DALO:
    google: '6BSVO6G_H08dt_uJWpDcf9P82Gwj9UYNDviLHqqHM1Y', 
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}

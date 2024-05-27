import "./globals.scss"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Donations app",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`${poppins.className} bg-gray-100`}>{children}</body>
    </html>
  )
}

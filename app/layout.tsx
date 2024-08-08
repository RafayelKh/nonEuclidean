import "./globals.css"
import { ReactNode } from "react"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import StyledComponentsRegistry from "./registry"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "3dfa.st",
  description: "Animate your 3D website in 5 minutes",
}

export default async function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

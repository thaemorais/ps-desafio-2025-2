import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '@/app/globals.css'
import { Providers } from '@/providers/providers'
import { Toaster as SonnerToaster } from '@/components/sonner'
import { Toaster } from '@/components/toaster'
import StyledComponentsRegistry from '@/lib/styled-components-registry'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Adapti Project Template',
  description: 'Created by Adapti 2025',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={roboto.className} suppressHydrationWarning>
        <StyledComponentsRegistry>
          <Providers>
            {children}
            <SonnerToaster />
            <Toaster />
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

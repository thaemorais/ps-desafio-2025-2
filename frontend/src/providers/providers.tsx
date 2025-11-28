'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import NextAuthSessionProvider from '@/providers/sessionProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    })
  }, [])

  return (
    <>
      <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
    </>
  )
}

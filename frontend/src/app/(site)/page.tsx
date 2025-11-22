'use client'

import { useEffect, useState } from 'react'

import Footer from './_components/Footer'
import Header from './_components/Header'
import CarrosselHero from './_components/CarrosselHero'
import CardImovel from './_components/CardImovel'

import { listarImoveis } from '@/services/properties'
import { propertyType } from '@/types/property'
import BannerMiddle from './_components/BannerMiddle'
import styles from './page.module.css'

export default function Home() {
  const [properties, setProperties] = useState<propertyType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadProperties() {
      setIsLoading(true)
      const data = await listarImoveis()
      if (isMounted) {
        setProperties(data)
        setIsLoading(false)
      }
    }

    loadProperties()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      <Header />
      <main className={styles.main}>
        <CarrosselHero />
        <BannerMiddle />
        <div className={styles.container}>
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingContent}>
                <div className={styles.loadingSpinner} />
                <p className={styles.loadingText}>Carregando imóveis...</p>
              </div>
            </div>
          ) : (
            <div className={styles.gridCards}>
              {properties.map((property) => (
                <CardImovel key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

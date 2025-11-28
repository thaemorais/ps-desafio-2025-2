'use client'

import { useEffect, useState, useMemo } from 'react'
import AOS from 'aos'

import Footer from './_components/Footer'
import Header from './_components/Header'
import CarrosselHero from './_components/CarrosselHero'
import CardImovel from './_components/CardImovel'
import FiltrosImoveis, { type FiltrosState } from './_components/FiltrosImoveis'

import { listarImoveis } from '@/services/properties'
import { propertyType } from '@/types/property'
import BannerMiddle from './_components/BannerMiddle'
import styles from './page.module.css'

export default function Home() {
  const [properties, setProperties] = useState<propertyType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<FiltrosState>({
    acquired: 'all',
    categoryId: 'all',
    minPrice: '',
    maxPrice: '',
  })

  useEffect(() => {
    // Inicializa o AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    })
  }, [])

  useEffect(() => {
    let isMounted = true

    async function loadProperties() {
      setIsLoading(true)
      const data = await listarImoveis()
      if (isMounted) {
        setProperties(data)
        setIsLoading(false)
        // Re-inicializa o AOS após carregar os dados
        AOS.refresh()
      }
    }

    loadProperties()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Filtro por status (Adquirido/Disponível)
      if (filters.acquired !== 'all') {
        const isAcquired = filters.acquired === 'acquired'
        if (property.acquired !== isAcquired) {
          return false
        }
      }

      // Filtro por categoria
      if (filters.categoryId !== 'all' && property.category_id !== filters.categoryId) {
        return false
      }

      // Filtro por preço mínimo
      if (filters.minPrice) {
        const minPrice = parseFloat(filters.minPrice)
        if (!isNaN(minPrice) && property.price < minPrice) {
          return false
        }
      }

      // Filtro por preço máximo
      if (filters.maxPrice) {
        const maxPrice = parseFloat(filters.maxPrice)
        if (!isNaN(maxPrice) && property.price > maxPrice) {
          return false
        }
      }

      return true
    })
  }, [properties, filters])

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
            <>
              <FiltrosImoveis onFilterChange={setFilters} />
              {filteredProperties.length === 0 ? (
                <div className={styles.emptyState}>
                  <p className={styles.emptyStateText}>
                    Nenhum imóvel encontrado com os filtros selecionados.
                  </p>
                </div>
              ) : (
                <div className={styles.gridCards}>
                  {filteredProperties.map((property, index) => (
                    <CardImovel 
                      key={property.id} 
                      property={property}
                      data-aos="zoom-in-up"
                      data-aos-once="false"
                      data-aos-delay={index * 300}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

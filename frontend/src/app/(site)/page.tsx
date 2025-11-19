'use client'

import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import Footer from './_components/Footer'
import Navbar from './_components/Navbar'
import CarrosselHero from './_components/CarrosselHero'
import CardImovel from './_components/CardImovel'

import { listarImoveis } from '@/services/properties'
import { propertyType } from '@/types/property'
import BannerMiddle from './_components/BannerMiddle'

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
      <Navbar />
      <main>
        <CarrosselHero />
        <BannerMiddle />
        <Container>
          {isLoading ? (
            <LoadingContainer>
              <LoadingContent>
                <LoadingSpinner />
                <LoadingText>Carregando imóveis...</LoadingText>
              </LoadingContent>
            </LoadingContainer>
          ) : (
            <GridCards>
              {properties.map((property) => (
                <CardImovel key={property.id} property={property} />
              ))}
            </GridCards>
          )}
        </Container>
      </main>
      <Footer />
    </>
  )
}

const GridCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  height: 100%;
  width: 100%;
  margin: 30px auto;
`

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 15px;
`

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  width: 100%;
`

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(11, 18, 44, 0.1);
  border-top-color: #0b122c;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`

const LoadingText = styled.p`
  margin-top: 16px;
  color: #4a4a4a;
  font-size: 0.95rem;
`

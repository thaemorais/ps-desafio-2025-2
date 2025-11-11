'use client'

import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Footer from '../../app/(site)/components/Footer'
import Navbar from '../../app/(site)/components/Navbar'
import CarrosselHero from './components/CarrosselHero'
import CarrosselDestaques from './components/CarrosselDestaques'
import CardImovel from './components/CardImovel'

import { listarPropriedades } from '@/services/properties'
import { propertyType } from '@/types/property'

export default function Home() {
  const [properties, setProperties] = useState<propertyType[]>([])

  useEffect(() => {
    let isMounted = true

    async function loadProperties() {
      const data = await listarPropriedades()
      if (isMounted) {
        setProperties(data)
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

        <Container>
          <CarrosselDestaques />
          <GridCards>
            {properties.map((property) => (
              <CardImovel key={property.id} property={property} />
            ))}
          </GridCards>
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

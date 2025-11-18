'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import { propertyType } from '@/types/property'
import { getCategory } from '@/services/category'
import { Category } from '@/types/category'
import { updateProperty } from '@/actions/property'

type PropertyDetailsProps = {
  property: propertyType
  formatadorDePreco?: Intl.NumberFormat
}

const formatadorDePrecoPadrao = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export default function PropertyDetails({
  property,
  formatadorDePreco = formatadorDePrecoPadrao,
}: PropertyDetailsProps) {
  const [propertyAtual, setPropertyAtual] = useState(property)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleAdquirirImovel = async () => {
    setIsUpdating(true)
    setPropertyAtual((prev) => ({
      ...prev,
      adquirido: true,
    }))
    const formData = new FormData()
    formData.append('acquired', 'true')
    await updateProperty(property.id, formData)
    setIsUpdating(false)
  }

  const [category, setCategory] = useState<Category | null>(null)
  const [isLoadingCategory, setIsLoadingCategory] = useState(true)

  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoadingCategory(true)
      const { response } = await getCategory(property.category_id)
      setCategory(response ?? null)
      setIsLoadingCategory(false)
    }
    fetchCategory()
  }, [property.category_id])

  return (
    <Main>
      <Hero $backgroundImage={propertyAtual.image ?? ''}>
        <HeroOverlay>
          <HeroContent>
            <CategoryBadge>
              {isLoadingCategory ? <LoadingSpinnerSmall /> : category?.name}
            </CategoryBadge>
            <HeroTitle>{propertyAtual.title}</HeroTitle>
            <HeroMeta>
              <StatusBadge $adquirido={propertyAtual.acquired}>
                {propertyAtual.acquired ? 'Adquirido' : 'Disponível'}
              </StatusBadge>
              <PriceTag>{formatadorDePreco.format(propertyAtual.price ?? 0)}</PriceTag>
            </HeroMeta>
          </HeroContent>
        </HeroOverlay>
      </Hero>

      <Content>
        <Breadcrumb>
          <Link href="/">Início</Link>
          <span>/</span>
          <span>{propertyAtual.title}</span>
        </Breadcrumb>

        <Section>
          <SectionTitle>Descrição</SectionTitle>
          <SectionText>{propertyAtual.description ?? 'Descrição não informada.'}</SectionText>
        </Section>

        <InfoGrid>
          <Section>
            <SectionTitle>Destaques</SectionTitle>
            <FeaturesList>
              {propertyAtual.features?.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </FeaturesList>
          </Section>

          <Section>
            <SectionTitle>Localização</SectionTitle>
            <SectionText>{propertyAtual.address}</SectionText>
            <MapContainer>
              <MapFrame
                title={`Mapa de ${propertyAtual.title}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(propertyAtual.address)}&output=embed`}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </MapContainer>
          </Section>
        </InfoGrid>

        <Actions>
          <PrimaryLink href="/">Voltar para a lista</PrimaryLink>
          {!propertyAtual.acquired && (
            <SecondaryButton type="button" onClick={handleAdquirirImovel} disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <LoadingSpinnerButton />
                  Processando...
                </>
              ) : (
                'Adquirir imóvel'
              )}
            </SecondaryButton>
          )}
        </Actions>
      </Content>
    </Main>
  )
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 160px);
`

const Hero = styled.section<{ $backgroundImage: string }>`
  width: 100%;
  min-height: 420px;
  background-image: ${({ $backgroundImage }) => `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.5)), url(${$backgroundImage})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
`

const HeroOverlay = styled.div`
  width: 100%;
  padding: 40px 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
`

const HeroContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #fff;
`

const CategoryBadge = styled.span`
  width: fit-content;
  padding: 6px 14px;
  border-radius: 999px;
  background-color: rgba(11, 18, 44, 0.7);
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
`

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
`

const HeroMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
`

const StatusBadge = styled.span<{ $adquirido: boolean }>`
  padding: 8px 18px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  background-color: ${({ $adquirido }) => ($adquirido ? 'rgba(229, 57, 53, 0.8)' : 'rgba(76, 175, 80, 0.8)')};
  color: #fff;
`

const PriceTag = styled.span`
  font-size: 1.75rem;
  font-weight: 700;
`

const Content = styled.section`
  max-width: 1280px;
  margin: 40px auto;
  padding: 0 20px 80px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.95rem;
  color: #4a4a4a;

  a {
    color: #0b122c;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  span:last-child {
    color: #0b122c;
    font-weight: 600;
  }
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #0b122c;
`

const SectionText = styled.p`
  font-size: 1.05rem;
  line-height: 1.6;
  color: #333;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`

const FeaturesList = styled.ul`
  display: grid;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    position: relative;
    padding-left: 20px;
    font-size: 1rem;
    color: #333;

    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: #0b122c;
      font-weight: 700;
    }
  }
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
`

const PrimaryLink = styled(Link)`
  padding: 12px 24px;
  border-radius: 999px;
  background-color: #0b122c;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  transition: filter 0.3s ease;

  &:hover {
    filter: brightness(1.1);
  }
`

const SecondaryButton = styled.button`
  padding: 12px 24px;
  border-radius: 999px;
  border: 2px solid #0b122c;
  background-color: transparent;
  color: #0b122c;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;

  &:hover:not(:disabled) {
    background-color: #0b122c;
    color: #fff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const MapContainer = styled.div`
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(11, 18, 44, 0.1);
  box-shadow: 0 12px 40px rgba(11, 18, 44, 0.08);
  min-height: 320px;
`

const MapFrame = styled.iframe`
  width: 100%;
  height: 100%;
  min-height: 320px;
  border: 0;
`

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const LoadingSpinnerSmall = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  display: inline-block;
`

const LoadingSpinnerButton = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(11, 18, 44, 0.3);
  border-top-color: #0b122c;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  display: inline-block;
`


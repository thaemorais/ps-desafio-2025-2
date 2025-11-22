'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { propertyType } from '@/types/property'
import { getCategory } from '@/services/category'
import { Category } from '@/types/category'
import { updateProperty } from '@/actions/property'
import { useToast } from '@/components/use-toast'
import styles from './PropertyDetails.module.css'

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
  const { toast } = useToast()
  const router = useRouter()

  const handleAdquirirImovel = async () => {
    setIsUpdating(true)
    
    try {
      // Envia como JSON em vez de FormData, já que não há upload de arquivo
      const { response, error } = await updateProperty(property.id, { acquired: 1 })
      
      if (error) {
        toast({
          title: 'Erro ao adquirir imóvel',
          description: error.message || 'Não foi possível adquirir o imóvel. Tente novamente.',
          variant: 'destructive',
        })
        setIsUpdating(false)
        return
      }

      // Atualiza o estado local apenas após sucesso da API
      if (response) {
        setPropertyAtual((prev) => ({
          ...prev,
          acquired: true,
        }))
        
        toast({
          title: 'Imóvel adquirido com sucesso!',
          description: 'O imóvel foi marcado como adquirido.',
        })
        
        // Revalida a página atual para garantir sincronização
        router.refresh()
      }
    } catch (error) {
      console.error('Erro ao adquirir imóvel:', error)
      toast({
        title: 'Erro inesperado',
        description: 'Ocorreu um erro ao processar a solicitação. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsUpdating(false)
    }
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
    <main className={styles.main}>
      <section 
        className={styles.hero}
        style={{
          backgroundImage: propertyAtual.image 
            ? `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.5)), url(${propertyAtual.image})`
            : undefined
        }}
      >
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <span className={styles.categoryBadge}>
              {isLoadingCategory ? <div className={styles.loadingSpinnerSmall} /> : category?.name}
            </span>
            <h1 className={styles.heroTitle}>{propertyAtual.title}</h1>
            <div className={styles.heroMeta}>
              <span className={`${styles.statusBadge} ${propertyAtual.acquired ? styles.statusBadgeAdquirido : styles.statusBadgeDisponivel}`}>
                {propertyAtual.acquired ? 'Adquirido' : 'Disponível'}
              </span>
              <span className={styles.priceTag}>{formatadorDePreco.format(propertyAtual.price ?? 0)}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <nav className={styles.breadcrumb}>
          <Link href="/">Início</Link>
          <span>/</span>
          <span>{propertyAtual.title}</span>
        </nav>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Descrição</h2>
          <p className={styles.sectionText}>{propertyAtual.description ?? 'Descrição não informada.'}</p>
        </section>

        <div className={styles.infoGrid}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Destaques</h2>
            <ul className={styles.featuresList}>
              {propertyAtual.features?.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Localização</h2>
            <p className={styles.sectionText}>{propertyAtual.address}</p>
            <div className={styles.mapContainer}>
              <iframe
                className={styles.mapFrame}
                title={`Mapa de ${propertyAtual.title}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(propertyAtual.address)}&output=embed`}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>
        </div>

        <div className={styles.actions}>
          <Link href="/" className={styles.primaryLink}>Voltar para a lista</Link>
          {!propertyAtual.acquired ? (
            <button type="button" className={styles.secondaryButton} onClick={handleAdquirirImovel} disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <div className={styles.loadingSpinnerButton} />
                  Processando...
                </>
              ) : (
                'Adquirir imóvel'
              )}
            </button>
          ) : 
            <button type="button" className={styles.secondaryButton} disabled>
              Imóvel adquirido
            </button>}
        </div>
      </section>
    </main>
  )
}
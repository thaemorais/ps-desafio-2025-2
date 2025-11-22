import { notFound } from 'next/navigation'

import Footer from '@/app/(site)/_components/Footer'
import Header from '@/app/(site)/_components/Header'
import { buscarImovelPorId } from '@/services/properties'
import PropertyDetails from './_components/PropertyDetails'
import styles from './page.module.css'

type PaginaImovelProps = {
  params: Promise<{
    id: string
  }>
}

export default async function PaginaImovel({ params }: PaginaImovelProps) {
  const { id } = await params
  
  try {
    const property = await buscarImovelPorId(id)

    if (!property) {
      notFound()
    }

    return (
      <>
        <Header />
        <main className={styles.main}>
          <PropertyDetails property={property} />
        </main>
        <Footer />
      </>
    )
  } catch (error) {
    console.error('Erro ao buscar propriedade:', error)
    notFound()
  }
}



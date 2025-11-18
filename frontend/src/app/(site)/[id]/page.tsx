import { notFound } from 'next/navigation'

import Footer from '@/app/(site)/components/Footer'
import Navbar from '@/app/(site)/components/Navbar'
import { buscarImovelPorId } from '@/services/properties'
import PropertyDetails from './components/PropertyDetails'

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
        <Navbar />
        <PropertyDetails property={property} />
        <Footer />
      </>
    )
  } catch (error) {
    console.error('Erro ao buscar propriedade:', error)
    notFound()
  }
}



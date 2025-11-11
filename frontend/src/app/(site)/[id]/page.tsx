'use client'

import { notFound } from 'next/navigation'

import Footer from '@/app/(site)/components/Footer'
import Navbar from '@/app/(site)/components/Navbar'
import { buscarImovelPorId } from '@/services/properties'
import PropertyDetails from './PropertyDetails'

type PaginaImovelProps = {
  params: {
    id: string
  }
}

export default async function PaginaImovel({ params }: PaginaImovelProps) {
  const property = await buscarImovelPorId(params.id)

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
}



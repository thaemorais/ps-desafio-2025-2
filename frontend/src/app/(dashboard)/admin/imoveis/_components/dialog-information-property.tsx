'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsProperty from './form-fields-property'
import { propertyType } from '@/types/property'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { buscarImovelPorId } from '@/services/properties'

interface DialogInformationPropertyProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationProperty({
  id,
  children,
}: DialogInformationPropertyProps) {
  const [property, setProperty] = useState<propertyType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const property = await buscarImovelPorId(id);

      if (property) {
        setProperty(property)
      } else {
        setProperty(null)
        toast({
          title: 'Imóvel não encontrado!',
        })
        setOpen(false)
      }
    }

    requestData()

    return () => setProperty(null)
  }, [id, open, toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do imóvel</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do imóvel abaixo.
          </DialogDescription>
        </DialogHeader>
        {property ? (
          <FormFieldsProperty property={property} readOnly />
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-sm text-gray-500">Carregando...</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

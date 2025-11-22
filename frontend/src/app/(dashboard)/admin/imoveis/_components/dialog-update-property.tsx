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
import { updateProperty } from '@/actions/property'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { propertyType } from '@/types/property'
import { ResponseErrorType, api } from '@/services/api'

interface DialogUpdatePropertyProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateProperty({ id, children }: DialogUpdatePropertyProps) {
  const [property, setProperty] = useState<propertyType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<propertyType>('GET', `/properties/${id}`)

      if (response) {
        setProperty(response)
      } else {
        setProperty(null)
        toast({
          title: 'Imóvel  não encontrado!',
        })
        setOpen(false)
      }
    }

    requestData()

    return () => {
      setProperty(null)
      setError(null)
    }
  }, [id, open, toast])

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)

    const { error } = await updateProperty(id, newForm)

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível editar o imóvel!',
      })
    } else {
      toast({
        title: 'Imóvel editado com sucesso!',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[70vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Editar imóvel</DialogTitle>
          <DialogDescription>
            Atualize as informações do imóvel abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 -mx-6 px-6">
          <form action={submit}>
            <FormFieldsProperty error={error} property={property} />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

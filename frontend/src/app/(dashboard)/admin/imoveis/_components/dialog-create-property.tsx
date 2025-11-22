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
import { createProperty } from '@/actions/property'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { ResponseErrorType } from '@/services/api'

interface DialogCreatePropertyProps {
  children: React.ReactNode
}

export function DialogCreateProperty({ children }: DialogCreatePropertyProps) {
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!open) {
      setError(null)
    }
  }, [open])

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)

    const { error } = await createProperty(newForm)

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível criar o imóvel!',
      })
    } else {
      toast({
        title: 'Imóvel criado com sucesso!',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[70vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Adicionar imóvel</DialogTitle>
          <DialogDescription>
            Preencha as informações do novo imóvel abaixo e clique em
            &rdquo;Salvar&rdquo; para incluí-lo no sistema.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 -mx-6 px-6">
          <form action={submit}>
            <FormFieldsProperty error={error} />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

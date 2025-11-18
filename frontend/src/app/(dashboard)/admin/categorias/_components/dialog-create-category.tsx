'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsCategory from './form-fields-category'
import { createCategory } from '@/actions/category'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { ResponseErrorType } from '@/services/api'

interface DialogCreateCategoryProps {
  children: React.ReactNode
}

export function DialogCreateCategory({ children }: DialogCreateCategoryProps) {
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

    const { error } = await createCategory(newForm)

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível criar a categoria!',
        description: error.message || 'Verifique os dados e tente novamente.',
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Categoria criada com sucesso!',
        description: 'A categoria foi adicionada ao sistema.',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar categoria</DialogTitle>
          <DialogDescription>
            Preencha as informações da nova categoria abaixo e clique em
            &rdquo;Salvar&rdquo; para incluí-lo no sistema.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsCategory error={error} />
        </form>
      </DialogContent>
    </Dialog>
  )
}

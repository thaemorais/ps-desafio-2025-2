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
import { updateCategory } from '@/actions/category'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { categoryType } from '@/types/category'
import { ResponseErrorType } from '@/services/api'
import { getCategory } from '@/actions/category'

interface DialogUpdateCategoryProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateCategory({
  id,
  children,
}: DialogUpdateCategoryProps) {
  const [category, setCategory] = useState<categoryType | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!open) {
      return
    }

    const requestData = async () => {
      setCategory(null)
      const { response, error } = await getCategory(id)

      if (response) {
        setCategory(response)
        return
      }

      toast({
        title: error?.message ?? 'Categoria não encontrada!',
      })
      setOpen(false)
    }

    requestData()

    return () => {
      setCategory(null)
      setError(null)
    }
  }, [id, open, toast])

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)

    const { error } = await updateCategory(id, newForm)

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível editar a categoria!',
      })
    } else {
      toast({
        title: 'Categoria editado com sucesso!',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar categoria</DialogTitle>
          <DialogDescription>
            Atualize as informações da categoria abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsCategory error={error} category={category} />
        </form>
      </DialogContent>
    </Dialog>
  )
}

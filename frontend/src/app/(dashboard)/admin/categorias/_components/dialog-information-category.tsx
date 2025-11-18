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
import { categoryType } from '@/types/category'
import SkeletonFormFieldsCategory from './skeleton-category'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { getCategory } from '@/services/category'

interface DialogInformationCategoryProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationCategory({
  id,
  children,
}: DialogInformationCategoryProps) {
  const [category, setCategory] = useState<categoryType | null>(null)
  const [open, setOpen] = useState<boolean>(false)
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

    return () => setCategory(null)
  }, [id, open, toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações da categoria</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas da categoria abaixo.
          </DialogDescription>
        </DialogHeader>
        {category ? (
          <FormFieldsCategory category={category} readOnly />
        ) : (
          <SkeletonFormFieldsCategory readOnly />
        )}
      </DialogContent>
    </Dialog>
  )
}

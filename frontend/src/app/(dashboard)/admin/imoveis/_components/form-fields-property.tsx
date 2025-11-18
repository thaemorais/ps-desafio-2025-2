'use client'

import { Button } from '@/components/button'
import {
  FormFieldsGroup,
  FormField,
  ImageForm,
  handleImageChange,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select'
import { Switch } from '@/components/switch'
import { cn } from '@/lib/utils'
import { ResponseErrorType } from '@/services/api'
import { getCategories } from '@/services/category'
import { categoryType } from '@/types/category'
import { propertyType } from '@/types/property'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsPropertyProps {
  property?: propertyType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsProperty({
  property,
  readOnly,
  error,
}: FormFieldsPropertyProps) {
  const { pending } = useFormStatus()
  const [updateImage, setUpdateImage] = useState<string | undefined>()
  const [categories, setCategories] = useState<categoryType[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    property?.category_id ?? '',
  )
  const [acquired, setAcquired] = useState<boolean>(property?.acquired ?? false)

  useEffect(() => {
    const fetchCategories = async () => {
      const { response } = await getCategories()
      if (response) {
        setCategories(response)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    if (property?.category_id) {
      setSelectedCategoryId(property.category_id)
    }
  }, [property?.category_id])

  useEffect(() => {
    if (property?.acquired !== undefined) {
      setAcquired(property.acquired)
    }
  }, [property?.acquired])

  return (
    <>
      <FormFieldsGroup>
        {property && <Input defaultValue={property.id} type="text" name="id" hidden />}
        <FormField>
          <Label htmlFor="title" required={!property}>
            Título
          </Label>
          <Input
            id="title"
            name="title"
            type="text"
            defaultValue={property?.title}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.title}
          />
        </FormField>
        <FormField>
          <Label htmlFor="description" required={!property}>
            Descrição
          </Label>
          <Input
            id="description"
            name="description"
            type="text"
            defaultValue={property?.description ?? undefined}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.description}
          />
        </FormField>
        <FormField>
          <Label htmlFor="price" required={!property}>
            Preço
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            defaultValue={property?.price}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.price}
          />
        </FormField>
        <FormField>
          <Label htmlFor="category_id" required={!property}>
            Categoria
          </Label>
          <Input
            id="category_id"
            name="category_id"
            type="hidden"
            value={selectedCategoryId}
          />
          <Select
            value={selectedCategoryId}
            onValueChange={setSelectedCategoryId}
            disabled={pending || readOnly}
          >
            <SelectTrigger id="category_id_select" className="col-span-3">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error?.errors?.category_id && (
            <p className="text-destructive text-xs mt-2 col-start-2 col-end-5">
              {error.errors.category_id}
            </p>
          )}
        </FormField>
        <FormField>
          <Label htmlFor="features" required={!property}>
            Características
          </Label>
          <Input
            id="features"
            name="features"
            type="text"
            defaultValue={Array.isArray(property?.features) ? property.features.join(', ') : undefined}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.features}
          />
        </FormField>
        <FormField>
          <Label htmlFor="address" required={!property}>
            Endereço
          </Label>
          <Input
            id="address"
            name="address"
            type="text"
            defaultValue={property?.address}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.address}
          />
        </FormField>
        <FormField>
          <Label htmlFor="acquired">
            Adquirido
          </Label>
          <Input
            id="acquired"
            name="acquired"
            type="hidden"
            value={acquired ? '1' : '0'}
          />
          <Switch
            checked={acquired}
            onCheckedChange={setAcquired}
            disabled={pending || readOnly}
            className="col-span-3 justify-self-start"
          />
          {error?.errors?.acquired && (
            <p className="text-destructive text-xs mt-2 col-start-2 col-end-5">
              {error.errors.acquired}
            </p>
          )}
        </FormField>
      </FormFieldsGroup>
      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}

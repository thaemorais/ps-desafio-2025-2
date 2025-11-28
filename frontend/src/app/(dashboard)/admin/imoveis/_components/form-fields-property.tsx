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
import { buscarCep, formatarEndereco, extrairDadosEndereco, type CepResponse } from '@/services/cep'
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
  const [selectedCategoryId, setSelectedCategoryId] = useState(property?.category_id ?? '')
  const [acquired, setAcquired] = useState(property?.acquired ?? false)
  const [cep, setCep] = useState('')
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')
  const [cepData, setCepData] = useState<CepResponse | null>(null)
  const [buscandoCep, setBuscandoCep] = useState(false)
  const [enderecoCompleto, setEnderecoCompleto] = useState('')

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
    if (property?.acquired !== undefined) setAcquired(property.acquired)
  }, [property?.acquired])

  useEffect(() => {
    if (!property?.address || cep || cepData) return
    
    const dados = extrairDadosEndereco(property.address)
    if (dados.cep) {
      setCep(dados.cep)
      buscarCep(dados.cep).then(setCepData).catch(() => {})
    }
    if (dados.numero) setNumero(dados.numero)
    if (dados.complemento) setComplemento(dados.complemento)
  }, [property?.address, cep, cepData])

  useEffect(() => {
    const cepLimpo = cep.replace(/\D/g, '')
    
    if (cepLimpo.length !== 8) {
      setCepData(null)
      if (!cepLimpo) setEnderecoCompleto('')
      return
    }

    if (cepData?.cep?.replace(/-/g, '') === cepLimpo) return

    setBuscandoCep(true)
    buscarCep(cepLimpo)
      .then(setCepData)
      .catch(() => setCepData(null))
      .finally(() => setBuscandoCep(false))
  }, [cep, cepData])

  useEffect(() => {
    setEnderecoCompleto(cepData ? formatarEndereco(cepData, numero, complemento) : '')
  }, [cepData, numero, complemento])

  return (
    <>
      <FormFieldsGroup>
        {property && <Input defaultValue={property.id} type="text" name="id" hidden />}
        <FormField>
          <Label htmlFor="image" hidden={readOnly && !property?.image} required={!property}>
            Imagem
          </Label>
          <Input
            name="image"
            id="image"
            type="file"
            accept="image/*"
            disabled={pending}
            hidden={readOnly}
            onChange={(e) => handleImageChange(e, setUpdateImage)}
            error={error?.errors?.image}
          />
          <ImageForm
            className="aspect-video w-full max-w-md"
            src={updateImage || property?.image || undefined}
          />
        </FormField>
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
            placeholder="Insira o título do imóvel"
          />
        </FormField>
        <FormField>
          <Label htmlFor="description" required={!property}>
            Descrição
          </Label>
          <Input
            id="description"
            name="description"
            placeholder="Insira a descrição do imóvel"
            type="text"
            defaultValue={property?.description ?? undefined}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.description}
          />
        </FormField>
        <FormField>
          <Label htmlFor="price" required={!property}>
            Preço (apenas números)
          </Label>
          <Input
            id="price"
            name="price"
            placeholder="Insira o preço do imóvel"
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
              {[...categories].sort((a, b) => a.name.localeCompare(b.name)).map((category) => (
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
            placeholder="Insira as características do imóvel"
          />
        </FormField>
        <FormField>
          <Label htmlFor="cep" required={!property}>
            CEP
          </Label>
          <Input
            id="cep"
            type="text"
            value={cep}
            onChange={(e) => {
              const valor = e.target.value.replace(/\D/g, '')
              if (valor.length <= 8) {
                setCep(valor)
              }
            }}
            placeholder="00000000"
            disabled={pending || readOnly}
            error={error?.errors?.address}
            maxLength={8}
          />
          {buscandoCep && (
            <p className="text-muted-foreground text-xs mt-1 col-start-2 col-end-5">
              Buscando endereço...
            </p>
          )}
          {cepData && !buscandoCep && (
            <p className="text-green-600 text-xs mt-1 col-start-2 col-end-5">
              {cepData.logradouro}, {cepData.bairro}, {cepData.localidade} - {cepData.uf}
            </p>
          )}
          {cep.replace(/\D/g, '').length === 8 && !cepData && !buscandoCep && (
            <p className="text-destructive text-xs mt-1 col-start-2 col-end-5">
              CEP não encontrado
            </p>
          )}
        </FormField>
        <FormField>
          <Label htmlFor="numero" required={!property}>
            Número
          </Label>
          <Input
            id="numero"
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="123"
            disabled={pending || readOnly}
            error={error?.errors?.address}
          />
        </FormField>
        <FormField>
          <Label htmlFor="complemento"  required={!property}>
            Complemento
          </Label>
          <Input
            id="complemento"
            type="text"
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
            placeholder="Apto 101, Bloco A, etc."
            disabled={pending || readOnly}
            error={error?.errors?.address}
          />
        </FormField>
        {/* Campo hidden com o endereço completo formatado */}
        <Input
          id="address"
          name="address"
          type="hidden"
          value={enderecoCompleto || property?.address || ''}
        />
        {!property && cep.replace(/\D/g, '').length === 8 && !enderecoCompleto && (
          <p className="text-destructive text-xs mt-1 col-start-2 col-end-5">
            Preencha o número do endereço
          </p>
        )}
        
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

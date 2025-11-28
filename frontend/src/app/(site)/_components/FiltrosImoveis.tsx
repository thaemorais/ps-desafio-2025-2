'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select'
import { categoryType } from '@/types/category'
import { getCategories } from '@/services/category'
import { Button } from '@/components/button'
import { LuX } from 'react-icons/lu'
import styles from './FiltrosImoveis.module.css'

export interface FiltrosImoveisProps {
  onFilterChange: (filters: FiltrosState) => void
}

export interface FiltrosState {
  acquired: 'all' | 'available' | 'acquired'
  categoryId: 'all' | string
  minPrice: string
  maxPrice: string
}

export default function FiltrosImoveis({ onFilterChange }: FiltrosImoveisProps) {
  const [categories, setCategories] = useState<categoryType[]>([])
  const [filters, setFilters] = useState<FiltrosState>({
    acquired: 'all',
    categoryId: 'all',
    minPrice: '',
    maxPrice: '',
  })

  useEffect(() => {
    async function loadCategories() {
      const { response } = await getCategories()
      if (response) {
        setCategories([...response].sort((a, b) => a.name.localeCompare(b.name)))
      }
    }
    loadCategories()
  }, [])

  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  const handleFilterChange = (key: keyof FiltrosState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      acquired: 'all',
      categoryId: 'all',
      minPrice: '',
      maxPrice: '',
    })
  }

  const hasActiveFilters =
    filters.acquired !== 'all' ||
    filters.categoryId !== 'all' ||
    filters.minPrice !== '' ||
    filters.maxPrice !== ''

  return (
    <div className={styles.filtrosContainer}>
      <h2 className={styles.filtrosTitle}>Filtros</h2>
      <div className={styles.filtrosGrid}>
        <div className={styles.filtroItem}>
          <Label htmlFor="acquired">Status</Label>
          <Select
            value={filters.acquired}
            onValueChange={(value) => handleFilterChange('acquired', value)}
          >
            <SelectTrigger id="acquired">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="available">Disponível</SelectItem>
              <SelectItem value="acquired">Adquirido</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className={styles.filtroItem}>
          <Label htmlFor="category">Categoria</Label>
          <Select
            value={filters.categoryId}
            onValueChange={(value) => handleFilterChange('categoryId', value)}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className={styles.filtroItem}>
          <Label htmlFor="minPrice">Preço Mínimo</Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="R$ 0,00"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            min="0"
          />
        </div>

        <div className={styles.filtroItem}>
          <Label htmlFor="maxPrice">Preço Máximo</Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="R$ 0,00"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            min="0"
          />
        </div>

        {hasActiveFilters && (
          <div className={styles.filtroItem}>
            <Button
              type="button"
              variant="outline"
              onClick={clearFilters}
              className={styles.clearButton}
            >
              <LuX className={styles.clearIcon} />
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}


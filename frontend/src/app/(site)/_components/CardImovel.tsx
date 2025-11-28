'use client'

import Link from 'next/link'
import { BsChevronRight } from 'react-icons/bs'

import { propertyType } from '@/types/property'
import { getCategory } from '@/services/category'
import { Category } from '@/types/category'
import { useEffect, useState } from 'react'
import styles from './CardImovel.module.css'

type CardImovelProps = {
  property: propertyType
  'data-aos'?: string
  'data-aos-delay'?: number
}

export default function CardImovel({ property, 'data-aos': dataAos, 'data-aos-delay': dataAosDelay }: CardImovelProps) {

  const [category, setCategory] = useState<Category | null>(null)
  const [isLoadingCategory, setIsLoadingCategory] = useState(true)

  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoadingCategory(true)
      const { response } = await getCategory(property.category_id)
      setCategory(response ?? null)
      setIsLoadingCategory(false)
    }
    fetchCategory()
  }, [property.category_id])

  return (
    <div 
      className={styles.cardImovelContainer}
      data-aos={dataAos}
      data-aos-delay={dataAosDelay}
    >
      <div 
        className={styles.cardImovelImage}
        style={{ backgroundImage: property.image ? `url(${property.image})` : undefined }}
      >
        <div className={styles.cardImovelContent}>
          <div className={styles.flexCenterBetween}>
              <h4>
                {isLoadingCategory ? <div className={styles.loadingSpinnerSmall} /> : category?.name}
              </h4>
            <span className={`${styles.statusBadge} ${property.acquired ? styles.statusBadgeAdquirido : styles.statusBadgeDisponivel}`}>
              {property.acquired ? 'Adquirido' : 'Disponível'}
            </span>
          </div>
          <h3>{property.title}</h3>
            {property.description && <p>{property.description}</p>}
          <div>
            <Link href={`/${property.id}`}>
              Ver detalhes
              <BsChevronRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
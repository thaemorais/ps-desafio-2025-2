'use client'

import Image from 'next/image'
import { CiSearch } from 'react-icons/ci'
import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.flexContainer}>
          <Link href="/" className={styles.logoLink}>
            <Image width={120} height={90} src="/assets/images/logo.png" alt="Logo" priority className={styles.logoImage} />
          </Link>
          <div className={styles.searchBar}>
            <input className={styles.searchInput} placeholder="Digite aqui o que você está procurando" />
            <button className={styles.searchButton} aria-label="Buscar">
              <CiSearch size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
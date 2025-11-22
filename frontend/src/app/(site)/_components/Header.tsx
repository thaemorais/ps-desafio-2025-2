'use client'

import Image from 'next/image'
import { CiSearch } from 'react-icons/ci'
import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.flexContainer}>
          <Link href="/" className={styles.logoLink}>
            <Image width={120} height={90} src="/assets/images/logo.png" alt="Logo" priority className={styles.logoImage} />
          </Link>
          <h3 className={styles.title}>A chave dos seus sonhos está aqui!</h3>
        </div>
      </div>
    </header>
  )
}
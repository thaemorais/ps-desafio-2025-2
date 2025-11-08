import type { CSSProperties } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Navbar() {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.flexContainer}>
            <a href="/" style={styles.logoContainer}>
                <Image width={120} height={90} style={styles.logo} src="/assets/images/logo.png" alt="Logo" />
            </a>
            <div style={styles.barraDeBusca}>
                <input type="text" placeholder="Digite aqui o que você está procurando" style={styles.input} />
                <button style={styles.button}><FontAwesomeIcon icon={['fas', 'search']} /></button>
            </div>
        </div>
      </div>
    </header>
  );
}
const styles: Record<string, CSSProperties> = {
    // quero que a header tenha um background preto com opacity mas quando a tela scrollar para baixo o background se torne transparente
    header: {
        transition: 'all 0.3s ease',
        height: '90px',
        width: '100%',
        background: 'linear-gradient(to bottom, rgba(0, 0, 0), transparent)',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
    },
    container: {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 15px',
        height: '100%',
    },
    flexContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    logoContainer: {
        height: '100%',
        width: '100%',
        maxWidth: '120px',
        display: 'block',
    },
    logo: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    barraDeBusca: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '36px',
        border: '1px solid #c3c3c3',
        borderRadius: '10px',
        padding: '0 10px',
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#ffffff',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
    },
    input: {
        border: 'none',
        outline: 'none',
        width: '100%',
        height: '100%',
        padding: '0 10px',
    },
    button: {
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        padding: '0 10px',
        width: '44px',
        height: '44px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}
'use client'

import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import styles from "./Footer.module.css";


export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.container}>
        <div className={styles.flexContainer}>
          <div className={styles.footerCol1}>
            <Link href="/" target="_blank">
              <Image src="/assets/images/logo.png" alt="Logo" width={120} height={90} />
            </Link>
            <div className={styles.redesSociais}>
              <Link href="https://www.instagram.com/thae.morais/" target="_blank">
                <FaInstagram size={24} />
              </Link>
              <Link href="https://br.linkedin.com/in/thaelen" target="_blank">
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>
          <div className={styles.footerCol2}>
            <h3>Contatos</h3>
            <Link href="https://wa.me/5527996438524" target="_blank">
              <FaPhone size={24} />
              (27) 99643-8524
            </Link>
            <Link href="mailto:thaemorais@gmail.com">
              <FaEnvelope size={24} /> thaemorais@gmail.com
            </Link>
            <Link href="https://maps.app.goo.gl/xVunPdL7n47m72w9A" target="_blank">
              <FaMapMarkerAlt size={24} />BR-101, km 60 - Litorâneo, São Mateus - ES, 29932-540
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

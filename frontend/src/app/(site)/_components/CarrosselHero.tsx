'use client'

import { listarImoveis } from "@/services/properties";
import { propertyType } from "@/types/property";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./CarrosselHero.module.css";

export default function CarrosselHero() {
  const swiperInstanceRef = useRef<SwiperType | null>(null);
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const [properties, setProperties] = useState<propertyType[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadProperties() {
      const data = await listarImoveis();
      if (isMounted) {
        setProperties(data);
      }
    }

    loadProperties();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function mountSwiper() {
      if (typeof window === "undefined" || !isMounted || properties.length === 0 || !swiperContainerRef.current) {
        return;
      }

      // Aguardar o próximo frame para garantir que o DOM está renderizado
      await new Promise((resolve) => requestAnimationFrame(resolve));

      const { default: Swiper } = await import("swiper");

      // Destruir instância anterior se existir
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }

      if (!isMounted || !swiperContainerRef.current) {
        return;
      }

      swiperInstanceRef.current = new Swiper(swiperContainerRef.current, {
        modules: [Navigation, Pagination, Autoplay],
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        autoplay: {
          delay: 10000,
          disableOnInteraction: false,
        },
        loop: properties.filter((p) => p.image).length > 1,
      });
    }

    mountSwiper();

    return () => {
      isMounted = false;
      swiperInstanceRef.current?.destroy(true, true);
      swiperInstanceRef.current = null;
    };
  }, [properties]);

  return (
    <section className={styles.sliderContainer}>
      <div ref={swiperContainerRef} className={`${styles.styledSwiper} swiper`}>
        <div className="swiper-wrapper">
          {properties
            .filter((property) => property.image) // Filtra apenas propriedades com imagem
            .map((property) => (
              <div key={property.id} className="swiper-slide">
                <div className={styles.slideImageContainer}>
                  <Image
                    src={property.image!}
                    alt={property.title}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                  <div className={styles.slideTitleOverlay}>
                    <h2 className={styles.slideTitle}>{property.title}</h2>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="swiper-pagination"></div>

        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>
    </section>
  );
}
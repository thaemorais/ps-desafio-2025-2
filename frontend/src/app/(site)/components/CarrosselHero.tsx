'use client'

import { listarImoveis } from "@/services/properties";
import { propertyType } from "@/types/property";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
    <SliderContainer>
      <StyledSwiper ref={swiperContainerRef} className="swiper">
        <div className="swiper-wrapper">
          {properties
            .filter((property) => property.image) // Filtra apenas propriedades com imagem
            .map((property) => (
              <div key={property.id} className="swiper-slide">
                <SlideImageContainer>
                  <Image
                    src={property.image!}
                    alt={property.title}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                  <SlideTitleOverlay>
                    <SlideTitle>{property.title}</SlideTitle>
                  </SlideTitleOverlay>
                </SlideImageContainer>
              </div>
            ))}
        </div>
        <div className="swiper-pagination"></div>

        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </StyledSwiper>
    </SliderContainer>
  );
}

const SliderContainer = styled.section`
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
`;

const StyledSwiper = styled.div`
  .swiper-button-prev,
  .swiper-button-next {
    background-color: #fff !important;
    border-radius: 50% !important;
    width: 40px !important;
    height: 40px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 24px !important;
    color: #000 !important;
  }

  .swiper-pagination-bullet {
    background-color: #fff !important;
    opacity: 0.5 !important;
    width: 10px !important;
    height: 10px !important;
    border-radius: 50% !important;
  }
  .swiper-pagination-bullet-active {
    opacity: 1 !important;
  }


  .swiper-slide {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;

const SlideImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 500px;
  margin: 0 auto;
`;

const SlideTitleOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 2rem;
  display: flex;
  align-items: flex-end;
`;

const SlideTitle = styled.h2`
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0;
  width: 100%;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;
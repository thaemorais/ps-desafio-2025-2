'use client'

import Navbar from "../../app/(site)/components/Navbar";
import Footer from "../../app/(site)/components/Footer";
import Swiper from 'swiper';
import 'swiper/css';
import { CSSProperties } from "react";
import Image from "next/image";
import { useEffect } from "react";


export default function Home() {
  const swiper = new Swiper('.swiper', {
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

  useEffect(() => {
    swiper.init();
  }, []);
  return (
    <>
    <Navbar />
    <main>
      <section style={styles.sliderContainer}>
      <div className="swiper">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <Image src="https://picsum.photos/1920/1080" alt="Slider 1" width={1920} height={1080} />
        </div>
        <div className="swiper-slide">
          <Image src="https://picsum.photos/1920/1080" alt="Slider 2" width={1920} height={1080} />
        </div>
        <div className="swiper-slide">
          <Image src="https://picsum.photos/1920/1080" alt="Slider 3" width={1920} height={1080} />
        </div>
        <div className="swiper-slide">
          <Image src="https://picsum.photos/1920/1080" alt="Slider 4" width={1920} height={1080} />
        </div>
      </div>
      <div className="swiper-pagination"></div>

      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>

      <div className="swiper-scrollbar"></div>
    </div>
      </section>
    </main>
    <Footer />
    </>
  );
}

const styles: Record<string, CSSProperties> = {
  sliderContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
}
import Image from "next/image";
import { useEffect } from "react";
import styled from "styled-components";
import Swiper from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function CarrosselHero() {
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
          disableOnInteraction: true,
        },
      });
    
      useEffect(() => {
        swiper.init();
      }, []);

    return (
        <SliderContainer>
          <StyledSwiper className="swiper">
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
          </StyledSwiper>
        </SliderContainer>
    )
}

const SliderContainer = styled.section`
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
`;

const StyledSwiper = styled.div`
  .swiper-button-prev,
  .swiper-button-next {
    background-color: #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 24px;
    color: #000;
  }
`;
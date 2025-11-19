import Image from "next/image";
import styled from "styled-components";

export default function BannerMiddle() {
  return (
    <BannerMiddleContainer>
      <Image src="/assets/images/banner.jpg" alt="Banner" width={1000} height={1000} />
    </BannerMiddleContainer>
  )
}

const BannerMiddleContainer = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 1080 / 377;
  margin: 30px 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
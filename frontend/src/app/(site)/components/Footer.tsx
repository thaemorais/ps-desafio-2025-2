import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import styled from "styled-components";


export default function Footer() {
  return (
    <FooterContainer>
      <Container>
        <FlexContainer>
          <FooterCol1>
            <Link href="/" target="_blank">
              <Image src="/assets/images/logo.png" alt="Logo" width={120} height={90} />
            </Link>
            <RedesSociais>
              <Link href="https://www.instagram.com/thae.morais/" target="_blank">
                <FaInstagram size={24} />
              </Link>
              <Link href="https://br.linkedin.com/in/thaelen" target="_blank">
                <FaLinkedin size={24} />
              </Link>
            </RedesSociais>
          </FooterCol1>
          <FooterCol2>
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
          </FooterCol2>
        </FlexContainer>
      </Container>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 100%;
  height: 400px;
  background:rgb(63, 93, 117, 0.7) url('/assets/images/bk-footer.png') no-repeat center center;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 15px;
  height: 100%;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
`;


const FooterCol1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const FooterCol2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 10px;
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    text-transform: uppercase;
    padding-bottom: 5px;
    border-bottom: 1px solid #fff;
    margin-bottom: 10px;
  }
  a {
    font-size: 0.88rem;
    font-weight: 400;
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const RedesSociais = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  a {
    background-color: #fff;
    border-radius: 50%;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    transition: all 0.3s ease;
    svg {
      color: #16214a;
      transition: color 0.3s ease;
    }
    &:hover {
      background-color: #16214A;
      svg {
        color: #fff;
      }
    }
  }
`;


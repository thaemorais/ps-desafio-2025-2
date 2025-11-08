'use client'

import Navbar from "../../app/(site)/components/Navbar";
import Footer from "../../app/(site)/components/Footer";
import CarrosselHero from "./components/CarrosselHero";
import CarrosselDestaques from "./components/CarrosselDestaques";
import styled from "styled-components";
import CardImovel from "./components/CardImovel";

export default function Home() {

  return (
    <>
      <Navbar />
      <main>
        <CarrosselHero />

        <Container>
          <CarrosselDestaques />
          <GridCards>
            <CardImovel />
            <CardImovel />
            <CardImovel />
            <CardImovel />
            <CardImovel />
            <CardImovel />
            <CardImovel />
            <CardImovel />
            <CardImovel />
            <CardImovel />
            <CardImovel />
            <CardImovel />
            <CardImovel />
          </GridCards>
        </Container>
      </main>
      <Footer />
    </>
  );
}

const GridCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  height: 100%;
  width: 100%;
  margin: 30px auto;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 15px;
`;
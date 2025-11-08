'use client'

import Navbar from "../../app/(site)/components/Navbar";
import Footer from "../../app/(site)/components/Footer";
import CarrosselHero from "./components/CarrosselHero";
import CarrosselDestaques from "./components/CarrosselDestaques";

export default function Home() {

  return (
    <>
      <Navbar />
      <main>
        <CarrosselHero />
        <CarrosselDestaques />
      </main>
      <Footer />
    </>
  );
}


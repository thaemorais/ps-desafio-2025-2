'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CiSearch } from 'react-icons/ci'
import styled from 'styled-components'

export default function Navbar() {
  return (
    <Header>
      <Container>
        <FlexContainer>
          <LogoLink href="/">
            <LogoImage width={120} height={90} src="/assets/images/logo.png" alt="Logo" priority />
          </LogoLink>
          <SearchBar>
            <SearchInput placeholder="Digite aqui o que você está procurando" />
            <SearchButton aria-label="Buscar">
              <CiSearch size={24} />
            </SearchButton>
          </SearchBar>
        </FlexContainer>
      </Container>
    </Header>
  )
}

const Header = styled.header`
  transition: all 0.3s ease;
  height: 90px;
  width: 100%;
  background: linear-gradient(to bottom, #fff, transparent);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 15px;
  height: 100%;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
`

const LogoLink = styled.a`
  height: 100%;
  width: 100%;
  max-width: 120px;
  display: block;
`

const LogoImage = styled(Image)`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  border: 1px solid #c3c3c3;
  border-radius: 10px;
  padding: 0 10px;
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  padding: 0 10px;
`

const SearchButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0 10px;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
`
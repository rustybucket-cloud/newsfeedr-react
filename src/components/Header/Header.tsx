import React, { useState } from 'react'
import { useTheme, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

interface Color {
  theme: {
    primary: {
      main: string
      contrastText: string
    }
    secondary: {
      main: string
      contrastText: string
    }
  }
}

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  z-index: 999;
  background-color: ${({ theme }: Color) => theme.secondary.main};
  height: var(--header-height);
  a {
    text-decoration: none;
    color: black;
  }
`

const Logo = styled.span`
  font-family: "Righteous", "Open Sans", sans-serif;
`

const Nav = styled.nav`
  ul {
    display: none
  }
  ul.open {
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    * {
      color: white;
      z-index: 99;
    }
    font-size: 2rem;
  }
  ul.open::after {
    z-index: 9;
    content: '';
    position: fixed;
    inset: 0;
    background-color: black;
    opacity: 0.75;
  }
  li {
    list-style-type: none;
  }
  a {
    text-decoration: none;
    color: ${({ theme }: Color) => theme.primary.contrastText};
    &: hover {
      color: ${({ theme }: Color) => theme.secondary.contrastText};
    }
  }

  @media only screen and (min-width: 650px) {
    ul {
      display: flex;
      gap: 8px;
      align-items: center;
    }
  }
`

const MenuButton = styled.button`
  background: none;
  border: none;
  z-index: 999;
  @media only screen and (min-width: 650px) {
    & {
      display: none;
    }
  }
`

const CloseButton = styled.button`
  background: none;
  border: none;
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 999;
  img {
    height: 35px;
  }
`

const BAR_HEIGHT = 4
const BAR_WIDTH = 35
const SVG_HEIGHT = BAR_HEIGHT * 6

export default function Header (): JSX.Element {
  const [open, setOpen] = useState(false)
  const theme = useTheme()

  return (
    <Wrapper theme={theme.palette}>
      <Link to="/"><Typography variant="h4" component="p"><Logo>NewsFeedr</Logo></Typography></Link>
      <Nav theme={theme.palette}>
        <ul className={open ? 'open' : ''}>
          <li><Button href="/">Trending</Button></li>
          <li><Button href="/search">Search</Button></li>
          <li><Button href="/games">Games</Button></li>
        </ul>
        {open
          ? <CloseButton onClick={() => { setOpen((curr) => !curr) }}><img src="/assets/icons/close.svg" alt="close" /></CloseButton>
          : (
            <MenuButton type="button" onClick={() => { setOpen((curr) => !curr) }}>
              <svg height={SVG_HEIGHT} width={BAR_WIDTH * 2}>
                <rect x={24 + BAR_WIDTH / 3} y={BAR_HEIGHT} width={BAR_WIDTH * (2 / 3)} height={BAR_HEIGHT} fill="black" />
                <rect x={24 + BAR_WIDTH * (1 / 6)} y={BAR_HEIGHT * 3} width={BAR_WIDTH * (5 / 6)} height={BAR_HEIGHT} fill="black" />
                <rect x="24" y={BAR_HEIGHT * 5} width={BAR_WIDTH} height={BAR_HEIGHT} fill="black" />
              </svg>
            </MenuButton>
            )}
      </Nav>
    </Wrapper>
  )
}

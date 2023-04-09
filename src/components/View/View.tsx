import React from 'react'
import Header from '../Header/Header'

interface Props {
  children: JSX.Element
}

export default function View ({ children }: Props): JSX.Element {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

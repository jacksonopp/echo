import React from 'react'
import Navbar from './Navbar'

type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <>
      <Navbar />
      <main className='w-11/12 mx-auto mt-8'>{children}</main>
    </>
  )
}

export default Layout
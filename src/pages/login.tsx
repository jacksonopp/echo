import React from 'react'
import LoginCard from '../components/LoginCard'
import Navbar from '../components/Navbar'

type Props = {}

const Login = (props: Props) => {
  return (
    <>
      <Navbar />
      <LoginCard />
    </>
  )
}

export default Login
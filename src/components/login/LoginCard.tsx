import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import LoginDialog from './LoginDialog'

type Props = {}

const LoginCard = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const closeModal = () => setIsOpen(false)

  const { data: session } = useSession();


  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-2xl font-bold text-center">
            Welcome to Echo
          </h1>
          <p className="text-center">
            Its like twitter, but louder.
          </p>
          {/* Two nextjs links to sign up and log in that are stacked vertically. The sign up link is blue, and the login button is white*/}
          <div className="flex flex-col items-center justify-center pt-8">
            <Link href="/signup">
              <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Sign Up
              </a>
            </Link>
            <button 
              onClick={() => {
                if (session) {
                  signOut()
                } else {
                  signIn()
                }
              }}
              className="bg-white mt-4 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-full"
            >
              Log {session ? 'out' : 'in'}
            </button>
            
          </div>
        </div>
      </div>

    </>
  )
}

export default LoginCard
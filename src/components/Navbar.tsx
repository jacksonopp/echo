import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'


const Navbar = () => {
  const { data: session } = useSession()

  return (
    // A navigation bar that is fixed to the top of the page.
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-4">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          Create T3 App
        </span>
      </div>
      <div className="flex items-center w-auto">
        <div className="flex-grow">
          {session ? (
            <Link href="/feed">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4">
                Feed
              </a>
            </Link>
          ) : (
            <Link href="/login">
              <a className="inline-block mt-0 text-teal-200 hover:text-white mr-4">
                Log In/Sign Up
              </a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
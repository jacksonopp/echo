import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import UserSearch, { PartialUser } from './UserSearch'


const Navbar = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const handleUserSelect = (user: PartialUser) => {
    console.log(user)
    router.push(`/user/${user.username}`)
  }

  return (
    // A navigation bar that is fixed to the top of the page.
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-4">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          Echo
        </span>
      </div>
      <div className="flex items-center w-auto">
        <div className="flex-grow">
          {session ? (
            <div className='flex items-center'>
              {/* A search input */}
              <UserSearch onSelect={handleUserSelect} />
              <Link href="/feed">
                <a className="block lg:inline-block lg:mt-0 text-white hover:text-gray-400 ml-4">
                  Feed
                </a>
              </Link>
            </div>
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
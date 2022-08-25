import { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'


const feed: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/');
    }
  }, [
    status
  ])

  return (
    <>
      {status === 'authenticated' && (
        <button
          className='bg-white mt-4 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-full'
          onClick={() => signOut()}>
          Logout
        </button>
      )}
    </>
  )
}

export default feed
import React from 'react'
import Layout from '../components/Layout'
import { useAuthenticatedPage } from '../hooks/useAuthenticatedPage'
import { trpc } from '../utils/trpc'

type Props = {}

const Profile = (props: Props) => {
  const { session, status } = useAuthenticatedPage('/login');
  const { data } = trpc.useQuery(['profile.get-profile', {
    id: session?.user?.id,
  }])

  console.log(data)

  return (
    <>
      <Layout>
        {status === 'authenticated' && (
          <>
            <h1 className='text-3xl text-white'>Profile: @{data?.shoutAccount?.username}</h1>
          </>
        )}
      </Layout>
    </>
  )
}

export default Profile
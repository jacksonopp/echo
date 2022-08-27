import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useAuthenticatedPage } from '../hooks/useAuthenticatedPage'
import { trpc } from '../utils/trpc'
import {useForm, SubmitHandler} from 'react-hook-form'

type Props = {}

type Inputs = {
  username: string
  bio: string
}

const Profile = (props: Props) => {
  const router = useRouter()
  const { session, status } = useAuthenticatedPage('/login');
  const { data } = trpc.useQuery(['profile.get-profile', {
    id: session?.user?.id,
  }]);
  
  const [isEditMode, setEditMode] = useState(!!router.query.newUser || !!router.query.edit);
  
  const {register, handleSubmit} = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data)

  return (
    <>
      <Layout>
        {router.query.newUser && (
          // An alert to tell the user that they need to create a profile using tailwind css
          <div className="bg-green-700 text-white p-4 rounded-lg">
            <p className='text-xl'>Welcome to Echo</p>
            <p>
              Tell us about yourself!
            </p>
          </div>
        )}
        {status === 'authenticated' && (
          <>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 p-4 rounded-lg">
              <div className="flex flex-col justify-between">
                <div className="flex-1">
                  {/* a submit button */}
    
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                    {...register('username')}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                    Bio
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="bio"
                    placeholder="Tell us about yourself"
                    {...register('bio')}
                  />
                  <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </Layout>
    </>
  )
}

export default Profile
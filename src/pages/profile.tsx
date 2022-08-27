import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useAuthenticatedPage } from '../hooks/useAuthenticatedPage'
import { trpc } from '../utils/trpc'
import { useForm, SubmitHandler } from 'react-hook-form'

type Props = {}

type Inputs = {
  username: string
  bio: string
}

const Profile = (props: Props) => {
  const router = useRouter()
  const { session, status } = useAuthenticatedPage('/login');
  const utils = trpc.useContext();
  const { data } = trpc.useQuery(['profile.get-profile', {
    id: session?.user?.id,
  }]);
  const { mutate } = trpc.useMutation(['profile.update-profile'], {
    onSuccess: () => {
      console.log('success');
      router.push('/profile');
      setEditMode(false)
      utils.invalidateQueries(['profile.get-profile', {
        id: session?.user?.id,
      }])
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [isEditMode, setEditMode] = useState(false);

  useEffect(() => {
    if (router.query.edit === 'true' || router.query.newUser === 'true') {
      setEditMode(true);
    }
  }, [router.query])

  const { register, handleSubmit, formState: {errors} } = useForm<Inputs>({
    defaultValues: {
      username: data?.profile?.username || '',
    }
  });
  const onSubmit: SubmitHandler<Inputs> = data => {
    mutate({
      id: session!.user!.id,
      username: data.username,
      bio: data.bio,
    })
  }

  return (
    <>
      {status === 'authenticated' && (
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
          {isEditMode ? (
            <>
              <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex flex-col justify-between">
                  <div className="flex-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                      Username
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Username"
                      {...register('username', {required: true, minLength: 3})}
                    />
                    {errors.username?.type === 'required' && <p className="text-red-500 text-xs italic">Username is required</p>}
                    {errors.username?.type === 'minLength' && <p className="text-red-500 text-xs italic">Username must be at least 3 characters</p>}
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                      Bio
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="bio"
                      placeholder="Tell us about yourself"
                      {...register('bio', {maxLength: 300})}
                      defaultValue={data?.profile?.bio ?? ''}
                    />
                    {errors.bio && <p className="text-red-500 text-xs italic">Cannot be more than 300 characters</p>}
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
          ) : (
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  router.push({
                    pathname: '/profile',
                    query: {edit: true}
                  })
                }}
              >
                Edit Profile
              </button>
              <p className='text-white'>@{data?.profile?.username}</p>
              <p className='text-white'>{data?.profile?.bio}</p>
            </div>

          )}
        </Layout>
      )}
    </>
  )
}

export default Profile
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { trpc } from '../../utils/trpc';


const Redirect = () => {
  const {data: session} = useSession();
  const router = useRouter();

  const {data, isLoading} = trpc.useQuery(['profile.get-profile', {id: session?.user?.id}]);

  useEffect(() => {
    if (data) {
      router.push('/feed');
    } else {
      router.push({
        pathname: '/profile',
        query: {
          newUser: true
        }
      });
    }
  }, [isLoading])
  
  return (
    null
  )
}

export default Redirect
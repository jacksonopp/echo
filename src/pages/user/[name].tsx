import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { trpc } from '../../utils/trpc';

const UserPage: NextPage = () => {
  const {
    query: { name },
  } = useRouter();

  const { data, error } = trpc.useQuery(['user.get-user', { username: name as string }]);

  return (
    <>
      <Layout>
        {error && (
          // a nice looking error message
          <div className='text-white'>
            <p className='text-2xl'>{error.message}</p>
          </div>
        )}
        {data && (
          <div className='flex flex-col md:flex-row text-white mx-auto'>
            <div className='flex-1'>
              <h1 className='text-2xl font-bold '>User Page</h1>
              <div className='flex flex-col'>
                <div className='flex flex-row'>
                  <div className='relative h-[250px] w-[250px]'>
                    <Image src='https://thispersondoesnotexist.com/image' width={250} height={250} className='rounded-full mr-2' />
                  </div>
                  <div className='flex flex-col ml-4'>
                    <h1 className='text-2xl font-bold'>@{data.username}</h1>
                    <p className='text-sm'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisi vel consectetur consectetur, nisi nisi consectetur nisi, vel consectetur nisi nisi vel nisi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex-1'>
              <h1 className='text-2xl font-bold'>Feed</h1>
              <p>This is the feed. It shows the user&apos;s tweets.</p>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default UserPage;

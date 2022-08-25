import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import NavBar from '../../components/Navbar'
import { trpc } from '../../utils/trpc'


const UserPage: NextPage = () => {
  const { query: {name} } = useRouter()
  return (
    <>
      <NavBar />
      {/* using tailwindcss, two columns. The left one contains information about the user, the right is a feed of tweets */}
      <div className="flex flex-col md:flex-row text-white mx-auto">
        <div className="flex-1">
          <h1 className="text-2xl font-bold ">User Page</h1>
          {/* in a column, the user name, their image, and a bio */}
          <div className="flex flex-col">
            <div className="flex flex-row">
              <Image
                src="https://thispersondoesnotexist.com/image"
                width={100}
                height={100}
                className="rounded-full mr-2"
              />
              <div className="flex flex-col ml-4">
                <h1 className="text-2xl font-bold">@{name}</h1>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec euismod, nisi vel consectetur consectetur, nisi nisi
                  consectetur nisi, vel consectetur nisi nisi vel nisi.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Feed</h1>
          <p>
            This is the feed. It shows the user's tweets.
          </p>
        </div>
      </div>
    </>
  )
}

export default UserPage
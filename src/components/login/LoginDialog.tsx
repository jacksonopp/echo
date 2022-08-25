import { Dialog, Transition } from '@headlessui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { Fragment } from 'react'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const LoginDialog = (props: Props) => {


  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Log In
                </Dialog.Title>
                {/* A nextjs link to log in with github */}

                <button onClick={() => signIn()} className="flex items-center w-full max-w-xs text-center mx-auto hover:bg-slate-400 rounded-full">
                  <img
                    className="h-12 w-auto"
                    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                    alt="Github"
                  />
                  <p className="text-base leading-6 text-gray-700">
                    Log in with Github
                  </p>
                </button>
                <button onClick={() => signOut()}>Log out</button>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default LoginDialog
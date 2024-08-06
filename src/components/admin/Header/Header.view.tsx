'use client';
import Image from 'next/image';
import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { useLogic } from './Header.logic';

interface HeaderAdminprops {
  username: string | undefined;
}

const Header = (props: HeaderAdminprops) => {
  const { data, methods } = useLogic();
  return (
    <>
      <div className="flex bg-slate-500 justify-around items-center text-white h-auto text-lg py-3">
        <div>
          <Image
            src={`/${data.logo}`}
            alt="logo"
            width={100}
            height={100}
            className="w-40 h-auto"
          />
          <button
            onClick={() => methods.setIsOpen(true)}
            className=" bg-black text-white mt-2 p-2 rounded-md cursor-pointer"
          >
            Change Logotype
          </button>
        </div>
        <div className="text-4xl" id="timestamp">
          {data.time}
        </div>

        <div className="flex flex-col items-center">
          {props.username}
          <input
            type="submit"
            value="Log out"
            className="cursor-pointer text-xl bg-white text-black w-auto px-2 text-center mt-3 rounded-md"
            onClick={methods.logOut}
          />
        </div>
      </div>
      <Transition appear show={data.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={methods.closeModal}>
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
                    Change Logotype
                  </Dialog.Title>
                  <section className="container cursor-pointer">
                    <div {...methods.getRootProps({ className: 'dropzone' })}>
                      <input {...methods.getInputProps()} />
                      <p>
                        Drag and drop some files here, or click to select files
                      </p>
                    </div>
                    <aside className="flex flex-row flex-wrap mt-8">
                      {data.thumbs}
                    </aside>
                  </section>
                  <div className=" w-full  flex justify-center gap-x-2">
                    {data.files ? (
                      <button
                        className="bg-slate-500 hover:bg-slate-700 text-white p-2 rounded-md cursor-pointer"
                        onClick={() => methods.uploadLogotype()}
                      >
                        Change Logotype
                      </button>
                    ) : (
                      ''
                    )}
                    <button
                      onClick={() => methods.closeModal()}
                      className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-md cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Header;

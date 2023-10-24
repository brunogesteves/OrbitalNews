'use client';
import React, { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai';
import { useLogic } from './Category.logic';
import { Spinner } from '@/components/icons';

interface categoriesProps {
  category: (cat: number) => void;
  defaultValue: string;
}

const Category = (props: categoriesProps) => {
  const { data, methods } = useLogic(props.defaultValue);

  return (
    <>
      <div className="group w-full">
        <div className="flex items-center border-2 border-black rounded-md h-8 w-full p-2 capitalize">
          {data.categorySelected}
        </div>
        <div className=" w-full bg-slate-50 px-2 overflow-y-auto max-h-56  hidden group-hover:block">
          <div className="hover:cursor-pointer hover:bg-slate-200">
            Select a category
          </div>
          <div
            className="hover:cursor-pointer hover:bg-slate-200"
            onClick={() => {
              methods.setCategorySelected('');
              methods.setIsOpen(true);
            }}
          >
            Create Category
          </div>
          {data.allCategories
            ?.sort((a, b) => a.name.localeCompare(b.name))
            .map((category) => {
              if (data.garbageHover !== category.id) {
                return (
                  <div
                    className="flex justify-between items-center hover:cursor-pointer hover:bg-slate-200 w-full"
                    key={category.id}
                  >
                    <span
                      className="w-11/12 capitalize"
                      onClick={() => {
                        methods.setCategorySelected(category.name);
                        props.category(category.id);
                      }}
                    >
                      {category.name}
                    </span>
                    <div
                      className="w-1/12"
                      onClick={() => methods.deleteCategory(category.id)}
                      onMouseEnter={() => methods.setGarbageHover(category.id)}
                      onMouseLeave={() => methods.setGarbageHover(0)}
                    >
                      <AiOutlineDelete />
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    className="flex justify-between items-center hover:cursor-pointer hover:bg-slate-200 w-full"
                    key={category.id}
                  >
                    <span
                      className="w-11/12 capitalize"
                      onClick={() => {
                        methods.setCategorySelected(category.name);
                        props.category(category.id);
                      }}
                    >
                      {category.name}
                    </span>
                    <div
                      className="w-1/12"
                      onClick={() => methods.deleteCategory(category.id)}
                      onMouseEnter={() => methods.setGarbageHover(category.id)}
                      onMouseLeave={() => methods.setGarbageHover(0)}
                    >
                      <AiFillDelete color="red" />
                    </div>
                  </div>
                );
              }
            })}
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
                    Create New Category
                  </Dialog.Title>
                  <input
                    type="text"
                    value={data.nameNewCategory}
                    placeholder="Type New Category "
                    className="border-2 border-black rounded-md mt-3 mr-3 w-3/5 pl-2 h-10"
                    onChange={(e) => methods.setNameNewCategory(e.target.value)}
                  />
                  <div
                    className={` ${
                      data.showWarning ? '' : 'hidden'
                    }  inline-flex justify-center rounded-md border border-transparent h-10 bg-blue-100 px-2 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                  >
                    Field is required
                  </div>
                  <div className="mt-3 gap-x-2 flex">
                    {!data.isAdded ? (
                      <button
                        type="button"
                        className={`inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                          data.runSpinner ? 'hidden' : ''
                        }`}
                        onClick={methods.addCategory}
                      >
                        Add
                      </button>
                    ) : (
                      <span
                        className={`inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                      >
                        Added
                      </span>
                    )}
                    <div className=" flex justify-center">
                      <Spinner runSpinner={data.runSpinner ? 'hidden' : ''} />
                    </div>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={methods.closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={data.errorMessage} as={Fragment}>
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
                    Warning message
                  </Dialog.Title>
                  <div className="m-3">Sorry, Try Again</div>
                  <div>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={methods.closeModal}
                    >
                      Close
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

export default Category;

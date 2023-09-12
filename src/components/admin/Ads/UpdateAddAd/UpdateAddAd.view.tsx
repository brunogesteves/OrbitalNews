'use client';
import React, { Fragment } from 'react';
import { Field, Form, Formik } from 'formik';
import { Dialog, Transition } from '@headlessui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { BannerSchema } from '@/Utils/yup';
import ImageUpload from '@/components/Common/ImageUpload';
import { useLogic } from './UpdateAddAd.logic';
import Image from 'next/image';

export const NewAd = (props: { data: any; methods: any }) => {
  const { data, methods } = props;
  const { functions, info } = useLogic(data.bannerId, (e: boolean) =>
    methods.setIsOpen(e)
  );

  return (
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
              <Dialog.Panel className="w-full max-w-md transform overflow-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {data.bannerId == 0 ? 'AddBanner' : 'Update Banner'}
                </Dialog.Title>

                <Formik
                  initialValues={info.initialValues}
                  validationSchema={BannerSchema}
                  onSubmit={async (values, actions) => {
                    methods.setRunSpinner(true);
                    info.bannerId == 0
                      ? functions.saveAd(values, actions, methods)
                      : functions.updateBannerAd(values, methods);
                  }}
                >
                  {({ errors, touched, values, setFieldValue }) => (
                    <Form>
                      <Field
                        name="title"
                        placeholder="title Banner"
                        className="border-2 border-black rounded-md mb-3 pl-1 w-full"
                        value={values.title}
                      />
                      {methods.errorField(errors, touched, 'title')}
                      <Field
                        name="link"
                        placeholder="link"
                        className="border-2 border-black rounded-md mb-3 pl-1 w-full"
                        value={values.link}
                      />
                      {methods.errorField(errors, touched, 'link')}
                      <Field
                        as="select"
                        name="position"
                        className="mb-3 w-full border-2 border-black rounded-md"
                        value={values?.position}
                      >
                        <option>Select a position</option>
                        <option value="top">top</option>
                        <option value="slide">slide</option>
                        <option value="news">news</option>
                      </Field>
                      <span className="mr-2">limtDate:</span>
                      <DatePicker
                        selected={new Date(values.limitDate)}
                        onChange={(date) => setFieldValue('limitDate', date)}
                        className="border-2 border-black rounded-md mb-3 w-full"
                        minDate={new Date()}
                      />
                      <Field
                        as="select"
                        name="status"
                        className="mb-3 w-full border-2 border-black rounded-md"
                        value={values?.status}
                      >
                        <option>Choose the status</option>
                        <option value="true">true</option>
                        <option value="false">false</option>
                      </Field>
                      {methods.errorField(errors, touched, 'status')}
                      <ImageUpload
                        file={(e: any) => {
                          setFieldValue('image', e[0].name);
                          setFieldValue('file', e);
                        }}
                      />
                      {values.file == undefined ? (
                        <Image
                          src={`/banners/${values.image}`}
                          alt={values.image}
                          width={500}
                          height={500}
                          className="h-auto w-full"
                        />
                      ) : (
                        ''
                      )}
                      {methods.errorField(errors, touched, 'image')}
                      <div className="w-full text-center  h-5">
                        {info.message}
                      </div>
                      <div className="w-full flex justify-center gap-x-3">
                        {data.runSpinner ? (
                          <svg
                            aria-hidden="true"
                            className={`w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 `}
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        ) : (
                          <button
                            type="submit"
                            className="bg-slate-200 hover:bg-slate-500 hover:text-white mt-3 w-20 h-10  rounded-md mb-3"
                          >
                            Add
                          </button>
                        )}

                        <button
                          type="button"
                          className="bg-red-200 hover:bg-red-500 hover:text-white mt-3 w-20 h-10 rounded-md mb-3"
                          onClick={() => methods.closeModal()}
                        >
                          Cancel
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

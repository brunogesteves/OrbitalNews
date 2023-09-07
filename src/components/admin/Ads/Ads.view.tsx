'use client';
import React, { Fragment } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { Field, Form, Formik } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { BannerSchema } from '@/Utils/yup';
import { useLogic } from './Ads.logic';
import ImageUpload from '../addEdit/ImageUpload';
import { api } from '@/Utils/api';

const Ads = () => {
  const { data, methods } = useLogic();
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="h-auto w-auto my-3 flex flex-col">
        <button
          className="bg-slate-300 text-black py-2 rounded-md my-2"
          onClick={() => methods.setIsOpen(true)}
        >
          Add Banner
        </button>
        <span className="text-3xl">Top Banners</span>
        {data.topBanners.map((banner, i) => (
          <Image
            key={i}
            src={`/banners/${banner.title}`}
            alt={banner.title}
            width={100}
            height={100}
            className="w-full h-auto"
          />
        ))}
      </div>
      <div className="text-3xl">Slide banners</div>
      {data.slideBanners.map((banner, i) => (
        <Image
          key={i}
          src={`/banners/${banner.title}`}
          alt={banner.title}
          width={100}
          height={100}
          className="w-full h-auto"
        />
      ))}
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
                    Add Banner
                  </Dialog.Title>

                  {/* <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={methods.closeModal}
                  >
                    Close
                  </button> */}
                  <Formik
                    initialValues={data.initialValues}
                    validationSchema={BannerSchema}
                    onSubmit={async (values) => {
                      console.log('ads: ', values);
                      await api
                        .post('/addbanner', values)
                        .then(async (res) => {
                          if (res.data.success) {
                            const formData = new FormData();
                            formData.append('file', values.file[0]);
                            formData.append('name', values.image);
                            formData.append('directory', '/banners');
                            const response = await fetch('/api/upload', {
                              method: 'POST',
                              body: formData,
                            });
                          }
                        })
                        .catch((error) => console.log(error));
                    }}
                  >
                    {({ errors, touched, values, setFieldValue }) => (
                      <Form>
                        <Field
                          name="title"
                          placeholder="title Banner"
                          className="border-2 border-black rounded-md mb-3 pl-1 w-full"
                        />
                        {methods.errorField(errors, touched, 'title')}
                        <Field
                          name="link"
                          placeholder="link"
                          className="border-2 border-black rounded-md mb-3 pl-1 w-full"
                        />
                        {methods.errorField(errors, touched, 'link')}
                        <Field
                          as="select"
                          name="position"
                          className="mb-3 w-full border-2 border-black rounded-md"
                        >
                          <option>Select a position</option>
                          <option value="top">top</option>
                          <option value="slide">slide</option>
                          <option value="news">news</option>
                        </Field>
                        <span className="mr-2">limtDate:</span>
                        <DatePicker
                          selected={values.limitDate}
                          onChange={(date) => setFieldValue('limitDate', date)}
                          className="border-2 border-black rounded-md mb-3 w-full"
                          minDate={new Date()}
                        />
                        <Field
                          as="select"
                          name="status"
                          className="mb-3 w-full border-2 border-black rounded-md"
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
                        <div className="w-full flex justify-center gap-x-3">
                          <button
                            type="submit"
                            className="bg-slate-200 hover:bg-slate-500 hover:text-white mt-3 w-20 h-10  rounded-md mb-3"
                          >
                            Add
                          </button>
                          <button
                            type="submit"
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
    </div>
  );
};

export default Ads;

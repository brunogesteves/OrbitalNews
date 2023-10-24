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
import { Spinner } from '@/components/icons';

export const NewAd = (props: { data: any; methods: any }) => {
  const { data, methods } = props;
  const { functions, info } = useLogic(
    data.bannerId,
    (e: boolean) => methods.setIsOpen(e),
    () => methods.getBanners()
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
                        selected={new Date(values.expirationDate)}
                        onChange={(date: Date) =>
                          setFieldValue('expirationDate', date)
                        }
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
                          <div className=" flex justify-center">
                            <Spinner
                              runSpinner={data.runSpinner ? 'hidden' : ''}
                            />
                          </div>
                        ) : (
                          <button
                            type="submit"
                            className="bg-slate-200 hover:bg-slate-500 hover:text-white mt-3 w-20 h-10  rounded-md mb-3"
                          >
                            {data.bannerId == 0 ? 'Add' : 'Update '}
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

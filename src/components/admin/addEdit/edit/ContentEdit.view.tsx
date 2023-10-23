'use client';
import React from 'react';
import { Formik, Field, Form } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';

import ImageUpload from '@/components/Common/ImageUpload';
import Category from '@/components/admin/addEdit/category/Category.view';
import Editor from '@/components/admin/addEdit/Editor';
import { PostSchema } from '@/Utils/yup';
import { useLogic } from './ContentEdit.logic';
import { api } from '@/Utils/api';
import { contentNewsProps } from '@/Utils/types';
import { Spinner } from '@/Utils/icons';

const ContentEdit = (props: { id: number }) => {
  const { data, methods } = useLogic(props.id);

  return (
    <div
      className={`flex justify-center ${
        data.initialValues.categoryId ? 'items-center' : 'items-start'
      }  h-full `}
    >
      {data.initialValues.categoryId ? (
        <Formik
          initialValues={data.initialValues}
          validationSchema={PostSchema}
          onSubmit={async (values: contentNewsProps) => {
            values.slug = methods.slugTitle(values.title);
            methods.setRunSpinner(true);

            await api
              .post('editpost', {
                id: props.id,
                values: values,
              })
              .then(async (res) => {
                methods.setMessage('');
                if (res.data.success) {
                  if (values.file) {
                    const formData = new FormData();
                    formData.append('file', values.file[0]);
                    formData.append('name', values.image);
                    formData.append('directory', '/');

                    const response = await fetch(`/api/upload`, {
                      method: 'POST',
                      body: formData,
                    });
                    console.log('res: ', response);
                    if (response) {
                      methods.setRunSpinner(false);
                      methods.setMessage('Post Updated');
                    }
                  } else {
                    methods.setRunSpinner(false);
                    methods.setMessage('Post Updated');
                  }
                }
              })
              .catch((error) => console.log(error));
          }}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form>
              <div className="flex justify-between items-start m-3 ">
                <div className="w-1/4 m-3">
                  <div className="w-full text-center -mt-3">{data.message}</div>
                  {/* {data.runSpinner ? (
                    <div className="flex justify-center mt-3 w-full">
                      <svg
                        aria-hidden="true"
                        className={`w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 ${
                          data.runSpinner ? '' : 'hidden'
                        }`}
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
                    </div>
                  ) : (
                    ''
                  )}{' '} */}
                  <div className=" flex justify-center">
                    <Spinner runSpinner={data.runSpinner ? 'hidden' : ''} />
                  </div>
                  <button
                    type="submit"
                    className="bg-slate-200 hover:bg-slate-500 hover:text-white mt-3 w-full border-2 border-black rounded-md mb-3"
                  >
                    Update Post
                  </button>
                  <Field
                    name="title"
                    value={values.title}
                    placeholder="title name"
                    className="border-2 border-black rounded-md mb-3 pl-1 w-full"
                  />
                  {methods.errorField(errors, touched, 'title')}
                  <Field
                    as="select"
                    value={values.section}
                    name="section"
                    className="mb-3 w-full border-2 border-black rounded-md"
                  >
                    <option value="n1">n1</option>
                    <option value="n2">n2</option>
                    <option value="n3">n3</option>
                    <option value="n4">n4</option>
                  </Field>
                  <DatePicker
                    selected={values.posted_at}
                    onChange={(date: Date) => setFieldValue('posted_at', date)}
                    className="border-2 border-black rounded-md mb-3 w-full"
                  />
                  {methods.errorField(errors, touched, 'posted_at')}
                  <ImageUpload
                    file={(e: any) => {
                      setFieldValue('image', e[0].name);
                      setFieldValue('file', e);
                    }}
                  />
                  {!values.file ? (
                    <Image
                      src={`/${values.image}`}
                      alt={values.image}
                      width={100}
                      height={100}
                      className="mb-3 w-full"
                    />
                  ) : (
                    ''
                  )}
                  {methods.errorField(errors, touched, 'image')}
                  <Category
                    category={(e: number) => setFieldValue('categoryId', e)}
                    defaultValue={data.defaultCategory}
                  />
                  {methods.errorField(errors, touched, 'categoryId')}
                </div>
                <div className="w-3/4">
                  <Editor
                    contentPost={(e: string) => setFieldValue('content', e)}
                    audio={(e: string | undefined) => setFieldValue('audio', e)}
                    defaultContent={values.content ?? ''}
                  />
                  {methods.errorField(errors, touched, 'content')}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <svg
          aria-hidden="true"
          className={`w-48 h-auto mr-2 text-gray-200 animate-spin dark:text-slate-600 fill-black `}
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
      )}
    </div>
  );
};

export default ContentEdit;

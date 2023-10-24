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
import { BigSpinner, Spinner } from '@/components/icons';

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
        <BigSpinner />
      )}
    </div>
  );
};

export default ContentEdit;

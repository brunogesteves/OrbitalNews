'use client';
import React from 'react';
import { Formik, Field, Form } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ImageUpload from '@/components/admin/addEdit/ImageUpload';
import Category from '@/components/admin/addEdit/category/Category.view';
import Editor from '@/components/admin/addEdit/Editor';
import { BannerSchema } from '@/Utils/yup';
import { useLogic } from './ContentAdd.logic';
import { api } from '@/Utils/api';

const ContentAdd = () => {
  const { data, methods } = useLogic();

  return (
    <div className="flex justify-start items-start h-full ">
      <Formik
        initialValues={data.initialValues}
        validationSchema={BannerSchema}
        onSubmit={async (values) => {
          values.slug = methods.slugTitle(values.title);

          await api
            .post('/createpost', values)
            .then(async (res) => {
              if (res.data.success) {
                const formData = new FormData();
                formData.append('file', values.file[0]);
                formData.append('name', values.image);
                formData.append('directory', '/');

                const response = await fetch('/api/upload', {
                  method: 'POST',
                  body: formData,
                });
                if (response) {
                  methods.setMessage('Post Added');
                  data.router.push(`/admin/edit/${res.data.success.id}`);
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
                <button
                  type="submit"
                  className="bg-slate-200 hover:bg-slate-500 hover:text-white mt-3 w-full border-2 border-black rounded-md mb-3"
                >
                  Add Post
                </button>
                <Field
                  name="title"
                  placeholder="title name"
                  className="border-2 border-black rounded-md mb-3 pl-1 w-full"
                />
                {methods.errorField(errors, touched, 'title')}
                <Field
                  as="select"
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
                  onChange={(date) => setFieldValue('posted_at', date)}
                  className="border-2 border-black rounded-md mb-3 w-full"
                />
                {methods.errorField(errors, touched, 'posted_at')}

                <ImageUpload
                  file={(e: any) => {
                    setFieldValue('image', e[0].name);
                    setFieldValue('file', e);
                  }}
                />
                {methods.errorField(errors, touched, 'image')}

                <Category
                  category={(e: number) => setFieldValue('categoryId', e)}
                  defaultValue={''}
                />
                {methods.errorField(errors, touched, 'categoryId')}
                <div className="w-full text-center mt-3">{data.message}</div>
              </div>
              <div className="w-3/4">
                <Editor
                  contentPost={(e: string) => setFieldValue('content', e)}
                  defaultContent=""
                />
                {methods.errorField(errors, touched, 'content')}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContentAdd;

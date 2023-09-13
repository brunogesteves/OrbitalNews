'use client';

import { LoginSchema } from '@/Utils/yup';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useLogic } from './Login.logic';
import { signIn } from 'next-auth/react';
import { LoginProps } from '@/Utils/types';

const Login = () => {
  const { data, methods } = useLogic();

  return (
    <Formik
      initialValues={data.initialValues}
      validationSchema={LoginSchema}
      onSubmit={async (values: LoginProps) => {
        const result = await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (result?.error) {
          methods.setMessage('Email or password wrong');
          return;
        }

        data.router.replace('/admin');
      }}
    >
      {({ errors, touched, values }) => (
        <Form>
          <div className="bg-slate-600 min-h-screen flex justify-center items-center flex-col">
            <Field
              name="email"
              className="w-64 h-7 rounded-md border-[1px] border-white bg-transparent text-white px-2 mb-3 placeholder:text-white"
              placeholder="Email"
            />
            {methods.errorField(errors, touched, 'email')}
            <Field
              name="password"
              type="password"
              className="w-64 h-7 rounded-md border-[1px] border-white bg-transparent text-white px-2 mb-3 placeholder:text-white"
              placeholder="Password"
            />
            {methods.errorField(errors, touched, 'password')}
            <button
              type="submit"
              className="bg-white w-64 h-7 text-black rounded-md"
            >
              Log In
            </button>
            <span className="text-white h-5 mt-3">{data.message}</span>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Login;

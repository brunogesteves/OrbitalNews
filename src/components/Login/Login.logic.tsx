'use client';
import { PostSchema } from '@/Utils/yup';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export const useLogic = () => {
  const [message, setMessage] = useState<string>('');
  const router = useRouter();
  const initialValues = {
    email: '',
    password: '',
  };

  function errorField(errors: any, touched: any, fieldName: string) {
    return errors[fieldName] && touched[fieldName] ? (
      <div className="text-white h-5 mb-3">{errors[fieldName]}</div>
    ) : null;
  }
  return {
    data: {
      initialValues,
      router,
      message,
    },
    methods: {
      errorField,
      setMessage,
    },
  };
};

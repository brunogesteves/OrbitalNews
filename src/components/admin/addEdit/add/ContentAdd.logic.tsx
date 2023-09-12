'use client';
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';

var slugify = require('slugify');

export const useLogic = () => {
  const router = useRouter();
  const initialValues = {
    title: '',
    image: '',
    content: '',
    slug: '',
    section: 'n1',
    categoryId: 0,
    posted_at: new Date(),
    audio: '',
    file: '',
  };
  const [message, setMessage] = useState<string>('');
  const [runSpinner, setRunSpinner] = useState<boolean>(false);
  const slugTitle = (title: string) => {
    return slugify(title, {
      replacement: '-',
      remove: /[*+~.()'"!:@]/g,
      lower: true,
      strict: false,
      locale: 'vi',
      trim: true,
    });
  };

  function errorField(errors: any, touched: any, fieldName: string) {
    return errors[fieldName] && touched[fieldName] ? (
      <div className="text-red-500 h-5 mb-3">{errors[fieldName]}</div>
    ) : null;
  }

  return {
    data: {
      message,
      router,
      initialValues,
      runSpinner,
    },
    methods: {
      slugTitle,
      errorField,
      setMessage,
      setRunSpinner,
    },
  };
};

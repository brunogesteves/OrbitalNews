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
    categoryId: '',
    posted_at: new Date(),
    file: '',
  };
  const [message, setMessage] = useState<string>('');
  const slugTitle = (title: string) => {
    return slugify(title, {
      replacement: '-',
      remove: { remove: /[*+~.()'"!:@]/g },
      lower: false,
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
    },
    methods: {
      slugTitle,
      errorField,
      setMessage,
    },
  };
};

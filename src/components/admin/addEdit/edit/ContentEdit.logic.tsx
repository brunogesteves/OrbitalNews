'use client';

import { useEffect, useState } from 'react';
var slugify = require('slugify');

import { contentNewsProps } from '@/Utils/types';
import { api } from '@/Utils/api';

export const useLogic = (id: number) => {
  const [infopost, setInfopost] = useState<contentNewsProps>();
  const [message, setMessage] = useState('');
  const [runSpinner, setRunSpinner] = useState<boolean>(false);
  const [defaultCategory, setDefaultCategory] = useState<string>('');

  function getContentPost() {
    api.get(`/getidpost/${id}`).then((res) => {
      setInfopost(res.data.success);
      setDefaultCategory(res.data.success.category.name);
    });
  }

  useEffect(() => {
    getContentPost();
  }, []);

  function toDate(date: any) {
    return new Date(date).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

  const initialValues = {
    title: infopost?.title ?? '',
    image: infopost?.image ?? '',
    content: infopost?.content ?? '',
    slug: infopost?.slug ?? '',
    section: infopost?.section ?? '',
    categoryId: infopost?.categoryId ?? 0,
    posted_at: new Date(),
    audio: infopost?.audio ?? '',
    file: '',
  };

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
      initialValues,
      message,
      runSpinner,
      defaultCategory,
    },
    methods: {
      setMessage,
      slugTitle,
      errorField,
      setRunSpinner,
    },
  };
};

'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
var slugify = require('slugify');

import { contentNewsProps } from '@/Utils/types';

export const useLogic = (id: number) => {
  const [infopost, setInfopost] = useState<contentNewsProps>();
  async function getContentPost() {
    axios
      .get(`http://localhost:3000/api/getidpost/${id}`)
      .then((res) => setInfopost(res.data.success));
  }

  useEffect(() => {
    getContentPost();
  }, []);

  const [message, setMessage] = useState('');
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
      infopost,
      message,
    },
    methods: {
      setInfopost,
      getContentPost,
      setMessage,
      slugTitle,
      errorField,
    },
  };
};

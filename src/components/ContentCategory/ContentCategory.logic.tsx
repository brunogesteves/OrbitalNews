'use client';

import { api } from '@/Utils/api';
import { categoriesProps, contentNewsProps } from '@/Utils/types';
import { useEffect, useState } from 'react';

interface categoryNewsProps {
  id: number;
  name: string;
  post: contentNewsProps[];
}

export const useLogic = (category: string) => {
  const [content, setContent] = useState<categoryNewsProps[]>([]);

  useEffect(() => {
    async function getContentCategory() {
      await api.get(`/category/${category}`).then((res) => {
        if (res.data.success) setContent(res.data.success);
      });
    }
    getContentCategory();
  }, []);
  return {
    data: {
      content,
    },
  };
};

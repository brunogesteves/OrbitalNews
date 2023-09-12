'use client';

import { api } from '@/Utils/api';
import { contentNewsProps } from '@/Utils/types';
import { useEffect, useState } from 'react';

export const useLogic = (namepage: string) => {
  const [posts, setPosts] = useState<contentNewsProps[]>([]);

  async function getMmorePosts() {
    await api.get(`/moreposts`, { params: { namepage } }).then((res) => {
      if (res.data) setPosts(res.data.results);
    });
  }

  useEffect(() => {
    getMmorePosts();
  }, []);

  return {
    data: {
      posts,
    },
  };
};

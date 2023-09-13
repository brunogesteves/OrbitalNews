'use client';
import { useEffect, useState } from 'react';

import { contentNewsProps } from '@/Utils/types';
import { useRouter } from 'next/navigation';
import { api } from '@/Utils/api';

export const useLogic = () => {
  const [allNews, setAllNews] = useState<contentNewsProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [runSpinner, setRunSpinner] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    async function getAllNews() {
      await api.get('/allnews').then((res) => {
        if (res.data) setAllNews(res.data.content);
      });
    }
    getAllNews();
  }, []);

  function closeModal() {
    setIsOpen(false);
    setIsDeleted(false);
  }

  async function deleteNews() {
    setRunSpinner(true);
    api.delete(`/deletenews/${idToDelete}`).then((res) => {
      if (res.data.success) {
        setRunSpinner(false);
        setIsDeleted(true);
      }
    });
  }

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

  function dateToNumber(date: Date) {
    const time = new Date(date);
    return time.getTime();
  }

  return {
    data: {
      allNews,
      isOpen,
      runSpinner,
      isDeleted,
      router,
    },
    methods: {
      setIsOpen,
      closeModal,
      setRunSpinner,
      setIsDeleted,
      deleteNews,
      setIdToDelete,
      toDate,
      dateToNumber,
    },
  };
};

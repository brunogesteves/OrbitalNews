'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { contentNewsProps } from '@/Utils/types';

export const useLogic = () => {
  const [allNews, setAllNews] = useState<contentNewsProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [runSpinner, setRunSpinner] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number>(0);

  useEffect(() => {
    async function getAllNews() {
      axios.get('http://localhost:3000/api/allnews').then((res) => {
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
    axios
      .delete(`http://localhost:3000/api/deletenews/${idToDelete}`)
      .then((res) => {
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

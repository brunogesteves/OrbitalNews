'use client';
import { api } from '@/Utils/api';
import { BannerProps } from '@/Utils/types';
import { useEffect, useState } from 'react';

export const useLogic = () => {
  const initialValues = {
    title: '',
    position: '',
    link: '',
    status: '',
    image: '',
    limitDate: new Date(),
    file: '',
  };
  const [banners, setBanners] = useState<BannerProps[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<number>();
  async function getBanners() {
    await api.get(`/banners`, { params: { section: 'slide' } }).then((res) => {
      if (res.data.results) {
        setBanners(res.data.results);
      }
    });
  }

  useEffect(() => {
    getBanners();
  }, []);

  useEffect(() => {
    async function deleteBanners() {
      await api
        .delete(`/banners`, { params: { id: idToDelete } })
        .then((res) => {
          if (res.data.status.success) {
            setBanners(banners.filter((banner) => banner.id != idToDelete));
          }
        });
    }
    if (idToDelete != 0) {
      deleteBanners();
    }
  }, [idToDelete]);

  function errorField(errors: any, touched: any, fieldName: string) {
    return errors[fieldName] && touched[fieldName] ? (
      <div className="text-red-500 h-5 mb-3">{errors[fieldName]}</div>
    ) : null;
  }

  function closeModal() {
    setIsOpen(false);
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
  return {
    data: {
      initialValues,
      banners,
      isOpen,
      idToDelete,
    },
    methods: {
      setIsOpen,
      closeModal,
      errorField,
      setIdToDelete,
      toDate,
    },
  };
};
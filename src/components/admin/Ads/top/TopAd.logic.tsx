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
  const [idToDelete, setIdToDelete] = useState<number>(0);
  const [expirationDate, setExpirationDate] = useState<Date>(new Date());
  const [status, setStatus] = useState<boolean>(true);
  function getBanners() {
    api
      .get(`/banners`, { params: { position: 'top' } })

      .then((res) => {
        if (res.data) {
          setBanners(res.data.results);
        }
      });
  }

  useEffect(() => {
    getBanners();
  }, []);

  useEffect(() => {
    async function deleteBanner() {
      await api
        .delete(`/banners`, { params: { id: idToDelete } })
        .then((res) => {
          if (res.data.status.success) {
            setBanners(banners.filter((banner) => banner.id != idToDelete));
          }
        });
    }
    if (idToDelete != 0) {
      deleteBanner();
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

  async function updateBanner(bannerId: number) {
    await api
      .put(`/banners/${bannerId}`, { limitDate: expirationDate, status })
      .then((res) => console.log(res));
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

  console.log(banners);

  return {
    data: {
      initialValues,
      banners,
      isOpen,
      idToDelete,
      expirationDate,
      status,
    },
    methods: {
      setIsOpen,
      closeModal,
      errorField,
      setIdToDelete,
      toDate,
      updateBanner,
      setExpirationDate,
      setStatus,
      setBanners,
    },
  };
};

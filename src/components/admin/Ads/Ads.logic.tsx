'use client';
import { useState } from 'react';

interface BannerProps {
  title: string;
  position: string;
  link: string;
  status: string;
  image: string;
  limitDate?: Date;
}

export const useLogic = () => {
  const [slideBanners, setSlideBanners] = useState<BannerProps[]>([]);
  const [topBanners, setTopBanners] = useState<BannerProps[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const initialValues = {
    title: '',
    position: '',
    link: '',
    status: '',
    image: '',
    limitDate: new Date(),
  };

  function errorField(errors: any, touched: any, fieldName: string) {
    return errors[fieldName] && touched[fieldName] ? (
      <div className="text-red-500 h-5 mb-3">{errors[fieldName]}</div>
    ) : null;
  }

  function closeModal() {
    setIsOpen(false);
  }
  return {
    data: {
      initialValues,
      topBanners,
      slideBanners,
      isOpen,
    },
    methods: {
      setIsOpen,
      closeModal,
      errorField,
    },
  };
};

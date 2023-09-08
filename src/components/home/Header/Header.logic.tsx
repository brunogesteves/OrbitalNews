'use client';
import { api } from '@/Utils/api';
import { BannerProps } from '@/Utils/types';
import { useEffect, useState } from 'react';

export const useLogic = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [slideBanner, setSlideBanner] = useState<BannerProps[]>([]);

  async function getSlideBanner() {
    await api.get(`/banners`, { params: { position: 'top' } }).then((res) => {
      if (res.data) {
        setSlideBanner(res.data.results);
      }
    });
  }

  useEffect(() => {
    getSlideBanner();
  }, []);

  return {
    data: {
      isDrawerOpen,
      settings,
      slideBanner,
    },
    methods: {
      setIsDrawerOpen,
    },
  };
};

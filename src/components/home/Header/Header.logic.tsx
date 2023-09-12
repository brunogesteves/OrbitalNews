'use client';
import { api } from '@/Utils/api';
import { BannerProps, categoriesProps } from '@/Utils/types';
import { useEffect, useState } from 'react';

export const useLogic = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [slideBanner, setSlideBanner] = useState<BannerProps[]>([]);
  const [allCategories, setAllCategories] = useState<categoriesProps[]>([]);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  async function getSlideBanner() {
    await api
      .get(`/banners`, { params: { position: 'top', isAdmin: false } })
      .then((res) => {
        if (res.data) {
          setSlideBanner(res.data.results);
        }
      });
  }

  async function getCategories() {
    await api
      .get('/getcategories')
      .then((res) => setAllCategories(res.data.allCategories))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getSlideBanner();
    getCategories();
  }, []);

  return {
    data: {
      isDrawerOpen,
      settings,
      allCategories,
      slideBanner,
      openDrawer,
    },
    methods: {
      setIsDrawerOpen,
      setOpenDrawer,
    },
  };
};

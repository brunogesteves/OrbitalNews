'use client';
import { useEffect, useState } from 'react';
import { BannerProps, contentNewsProps } from '@/Utils/types';
import { api } from '@/Utils/api';

export const useLogic = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const [allNews, setAllNews] = useState<contentNewsProps[]>([]);
  const [slideBanner, setSlideBanner] = useState<BannerProps[]>([]);

  async function getSlides() {
    await api
      .get('/sectionposts', { params: { section: 'n2', limit: 4 } })
      .then((res) => {
        if (res.data) setAllNews(res.data.results);
      });
  }

  async function getSlideBanner() {
    await api.get(`/banners`, { params: { position: 'slide' } }).then((res) => {
      if (res.data) {
        setSlideBanner(res.data.results);
      }
    });
  }

  useEffect(() => {
    getSlides();
    getSlideBanner();
  }, []);

  return {
    data: { settings, allNews, slideBanner },
  };
};

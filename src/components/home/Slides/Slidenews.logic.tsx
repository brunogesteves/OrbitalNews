'use client';
import { useEffect, useRef, useState } from 'react';
import { BannerProps, contentNewsProps } from '@/Utils/types';
import { api } from '@/Utils/api';
import Slider from 'react-slick';

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
  const sliderRef = useRef<Slider>(null);

  async function getNews() {
    await api
      .get('/sectionposts', { params: { section: 'n2', quantity: 4 } })
      .then((res) => {
        if (res.data) setAllNews(res.data.results);
      });
  }

  async function getSlideBanner() {
    await api
      .get(`/banners`, { params: { position: 'slide', isAdmin: false } })
      .then((res) => {
        if (res.data) {
          setSlideBanner(res.data.results);
        }
      });
  }

  useEffect(() => {
    getNews();
    getSlideBanner();
  }, []);

  return {
    data: { settings, allNews, slideBanner, sliderRef },
  };
};

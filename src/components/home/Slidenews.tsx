'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { contentNewsProps } from '@/Utils/types';
import { api } from '@/Utils/api';

const Slidenews = () => {
  const [allNews, setAllNews] = useState<contentNewsProps[]>([]);

  useEffect(() => {
    api
      .get('/sectionposts', { params: { section: 'n2', limit: 4 } })
      .then((res) => {
        if (res.data) setAllNews(res.data.results);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="w-1/2 max-sm:w-full">
      <Slider {...settings}>
        {allNews?.map((slide, i) => {
          return (
            <Link
              href={slide.slug}
              //   className="w-1/2 max-sm:h-auto max-sm:w-full"
              key={i}
            >
              <Image
                src={`/${slide.image}`}
                alt={slide.image}
                width={200}
                height={10}
                className="w-full h-96 object-cover"
              />
            </Link>
          );
        })}
      </Slider>
      <Link href="{/ad.slug}">
        <Image
          src="{`/${ad.image}`}"
          alt=""
          width={200}
          height={10}
          className="w-full h-28 object-cover"
        />
      </Link>
    </div>
  );
};

export default Slidenews;

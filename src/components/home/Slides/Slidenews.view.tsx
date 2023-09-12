'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import { useLogic } from './Slidenews.logic';

const Slidenews = () => {
  const { data } = useLogic();

  return (
    <div className="w-1/2 max-sm:w-full relative">
      <div
        className="absolute left-0 top-1/3 z-20 bg-slate-300 p-3 rounded-r-md "
        onClick={() => data.sliderRef.current?.slickPrev()}
      >
        <AiOutlineLeft size={30} />
      </div>
      <div
        className="absolute right-0 top-1/3 z-20 bg-slate-300 p-3 rounded-l-md "
        onClick={() => data.sliderRef.current?.slickNext()}
      >
        <AiOutlineRight size={30} />
      </div>
      <Slider {...data.settings} ref={data.sliderRef}>
        {data.allNews?.map((info, i: number) => {
          return (
            <Link href={`/${info.slug}`} key={i} className="relative bg-black">
              <Image
                src={`/${info.image}`}
                alt={info.image}
                width={200}
                height={10}
                className="w-full h-96 object-cover opacity-75"
              />
              <span className="absolute bottom-10 text-white px-10 drop-shadow-xl">
                {info.title}
              </span>
            </Link>
          );
        })}
      </Slider>
      <Slider {...data.settings}>
        {data.slideBanner?.map((banner) => (
          <Link href={banner.link} target="_blank" key={banner.id}>
            <Image
              src={`/banners/${banner.image}`}
              alt={banner.image}
              width={500}
              height={500}
              className="w-full h-28 object-cover"
            />
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default Slidenews;

'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { useLogic } from './Slidenews.logic';

const Slidenews = () => {
  const { data } = useLogic();

  return (
    <div className="w-1/2 max-sm:w-full">
      <Slider {...data.settings}>
        {data.allNews?.map((info, i: number) => {
          return (
            <Link href={info.slug} key={i}>
              <Image
                src={`/${info.image}`}
                alt={info.image}
                width={200}
                height={10}
                className="w-full h-96 object-cover"
              />
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

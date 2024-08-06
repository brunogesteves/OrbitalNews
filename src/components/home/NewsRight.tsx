'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/Utils/api';
import { contentNewsProps } from '@/Utils/types';

const NewsRight = () => {
  const [allNews, setAllNews] = useState<contentNewsProps[]>([]);

  useEffect(() => {
    api
      .get('/sectionposts', { params: { section: 'n4', quantity: 9 } })
      .then((res) => {
        if (res.data) setAllNews(res.data.results);
      });
  }, []);

  return (
    <div className="w-7/12 flex flex-wrap bg-slate-500 h-auto max-sm:w-full   max-lg:w-full max-lg:mt-2 max-sm:flex-col max-sm:px-0">
      {allNews?.map((news) => {
        return (
          <Link
            href={news.slug}
            className="w-1/3 max-sm:w-full max-sm:h-auto p-1 max-sm:flex max-sm:justify-center"
            key={news.id}
          >
            <Image
              src={`/${news.image}`}
              alt=""
              width={200}
              height={200}
              className="w-full max-sm:w-[121px] h-32  max-sm:h-[121px] object-none "
            />
            <div className="max-sm:h-full w-full max-sm:w-full p-1 ">
              <span className="h-full w-full max-sm:px-2 text-white font-bold max-sm:font-normal text-xl max-sm:py-0 max-sm:text-lg">
                {news.title}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default NewsRight;

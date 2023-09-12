'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { contentNewsProps } from '@/Utils/types';
import { api } from '@/Utils/api';

const NewsLeft = () => {
  const [allNews, setAllNews] = useState<contentNewsProps[]>([]);

  useEffect(() => {
    api
      .get('/sectionposts', { params: { section: 'n1', limit: 4 } })
      .then((res) => {
        if (res.data) setAllNews(res.data.results);
      });
  }, []);

  return (
    <div className="flex flex-wrap w-1/2 h-auto max-sm:w-full max-sm:mt-10">
      {allNews?.map((news) => {
        return (
          <Link
            href={`/${news.slug}`}
            className="w-1/2 max-sm:w-full max-sm:flex max-sm:justify-center max-sm:items-center max-sm:h-auto px-1"
            key={news.id}
          >
            <Image
              src={`/${news.image}`}
              alt=""
              width={200}
              height={200}
              className="w-full max-sm:w-[121px] h-32  max-sm:h-[121px] object-cover"
            />
            <div className="h-full max-sm:h-full w-full max-sm:w-full p-1">
              <span className="h-full w-full max-sm:px-2 text-black font-bold max-sm:font-normal text-xl max-sm:py-0 max-sm:text-lg max-sm:text-black ">
                {news.title}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default NewsLeft;

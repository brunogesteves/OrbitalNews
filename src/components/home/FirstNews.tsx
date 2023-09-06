'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { contentNewsProps } from '@/Utils/types';
import { api } from '@/Utils/api';

const FirstNews = ({ news }: any) => {
  const [allNews, setAllNews] = useState<contentNewsProps[]>([]);

  useEffect(() => {
    api
      .get('/sectionposts', { params: { section: 'n3', limit: 6 } })
      .then((res) => {
        if (res.data) setAllNews(res.data.results);
      });
  }, []);

  return (
    <div className="w-5/12 h-auto flex flex-col justify-between max-lg:w-full max-sm:w-full max-sm:flex-col mr-2 gap-3">
      {allNews?.map((news) => {
        return (
          <Link href="{news.link}" key={news.id}>
            <span className="border-l-4 border-red-500 pl-2 cursor-pointer text-xl">
              {news.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default FirstNews;

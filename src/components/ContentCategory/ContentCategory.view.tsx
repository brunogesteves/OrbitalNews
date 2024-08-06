'use client';
import React from 'react';
import { useLogic } from './ContentCategory.logic';
import Image from 'next/image';
import Link from 'next/link';

const ContentCategory = (props: { category: string }) => {
  const { data } = useLogic(props.category);

  return (
    <section className="mx-3 h-auto w-auto flex justify-start flex-wrap gap-4">
      {data.content.map((news, i) => (
        <Link
          href={`/${news.post[i].slug}`}
          key={i}
          className="h-44 w-52  text-black"
        >
          <Image
            src={`/${news.post[i].image}`}
            alt={news.post[i].image}
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
          <span className="cursor-pointer text-lg font-bold">
            {' '}
            {news.post[i].title}
          </span>
        </Link>
      ))}
    </section>
  );
};

export default ContentCategory;

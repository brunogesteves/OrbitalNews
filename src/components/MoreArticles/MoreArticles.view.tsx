'use client';

import React from 'react';
import Image from 'next/image';

import { useLogic } from './MoreArticles.logic';
import Link from 'next/link';

function MoreArticles(props: { namepage: string }) {
  const { data } = useLogic(props.namepage);
  return (
    <div>
      {data.posts.map((post, i) => (
        <div className="mb-10" key={i}>
          <Link href={`/${post.slug}`} className="w-full h-52 mb-2">
            <Image
              src={`/${post.image}`}
              alt="logo"
              width={500}
              height={500}
              className="w-full h-full"
            />
          </Link>
          <p className="text-2xl">{post.title}</p>
        </div>
      ))}
    </div>
  );
}

export default MoreArticles;

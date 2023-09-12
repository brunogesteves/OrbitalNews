'use client';

import React from 'react';
import Image from 'next/image';

import { useLogic } from './MoreArticles.logic';

function MoreArticles(props: { namepage: string }) {
  const { data } = useLogic(props.namepage);
  return (
    <div>
      {[1, 1, 1].map((post, i) => (
        <div className="mb-10" key={i}>
          <div className="bg-red-600 w-full h-52 mb-2">
            <Image
              src="/logo.jpg"
              alt="logo"
              width={200}
              height={500}
              className="w-full h-full"
            />
          </div>
          <p className="text-red-600">{post}</p>
        </div>
      ))}
    </div>
  );
}

export default MoreArticles;

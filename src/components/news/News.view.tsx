'use client';
import React from 'react';
import Image from 'next/image';

import { useLogic } from './News.logic';

const Content = (props: { namepage: string }) => {
  const { data, methods } = useLogic(props.namepage);

  return (
    <div className="h-full text-center px-2 w-full flex flex-col justify-center ">
      <h1 className="w-full text-justify text-4xl font-bold mb-2 max-sm:px-2">
        {data.infopost?.title}
      </h1>
      <div className="flex justify-center">
        <Image
          src={`/${data.infopost?.image}`}
          alt={data.infopost?.image ?? ''}
          width={100}
          height={100}
          className="w-96 h-auto mb-3 "
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => methods.textToSpeech('play')}
          className={`cursor-pointer w-20 bg-black text-white p-3 ${
            data.isPlaying ? 'hidden' : ''
          }`}
        >
          Play
        </button>
        <button
          onClick={() => methods.textToSpeech('stop')}
          className={`cursor-pointer w-20 bg-black text-white p-3 ${
            data.isPlaying ? '' : ' hidden'
          }`}
        >
          Stop
        </button>

        <button
          onClick={() => methods.textToSpeech('pause')}
          className={`cursor-pointer w-20 ml-3 bg-black text-white p-3 ${
            data.isPlaying && !data.isPause ? 'block' : ' hidden'
          }`}
        >
          Pause
        </button>
        <button
          onClick={() => methods.textToSpeech('resume')}
          className={`cursor-pointer w-20 ml-3 bg-black text-white p-3 ${
            data.isPlaying && data.isPause ? 'block' : ' hidden'
          }`}
        >
          Resume
        </button>
      </div>
      <div
        className="mt-3"
        dangerouslySetInnerHTML={{ __html: data.infopost?.content ?? '' }}
      />
    </div>
  );
};

export default Content;

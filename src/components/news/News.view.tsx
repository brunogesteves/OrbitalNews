'use client';
import React from 'react';
import Image from 'next/image';

import { useLogic } from './News.logic';

const Content = (props: { namepage: string }) => {
  const { data, methods } = useLogic(props.namepage);

  return (
    <div className="h-full text-center px-2 w-full flex justify-center ">
      <div className="excerpt">
        <h1 className="w-full text-justify text-3xl font-bold mb-2 max-sm:px-2">
          title : {props.namepage}
        </h1>
        <Image
          src={`/${data.infopost?.image}`}
          alt="thumb"
          width={100}
          height={100}
          className="w-96 h-auto mb-3"
        />

        <button
          onClick={() => methods.textToSpeech('play')}
          className={`cursor-pointer bg-black text-white p-3 ${
            data.isPlaying ? 'hidden' : ''
          }`}
        >
          Play
        </button>
        <button
          onClick={() => methods.textToSpeech('stop')}
          className={`cursor-pointer bg-black text-white p-3 ${
            data.isPlaying ? '' : ' hidden'
          }`}
        >
          Stop
        </button>

        <button
          onClick={() => methods.textToSpeech('pause')}
          className={`cursor-pointer bg-black text-white p-3 ${
            data.isPlaying && !data.isPause ? 'block' : ' hidden'
          }`}
        >
          Pause
        </button>
        <button
          onClick={() => methods.textToSpeech('resume')}
          className={`cursor-pointer bg-black text-white p-3 ${
            data.isPlaying && data.isPause ? 'block' : ' hidden'
          }`}
        >
          Resume
        </button>
        <div
          className="mt-3"
          dangerouslySetInnerHTML={{ __html: data.infopost?.content ?? '' }}
        />
      </div>
    </div>
  );
};

export default Content;

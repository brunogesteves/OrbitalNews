'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { contentNewsProps } from '@/Utils/types';
import { api } from '@/Utils/api';
import { useRouter } from 'next/navigation';

export const useLogic = (namePage: string) => {
  const [infopost, setInfopost] = useState<contentNewsProps>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPause, setIsPause] = useState<boolean>(false);
  const { replace } = useRouter();

  async function getContentPost() {
    api.get(`/getuniquepost/${namePage}`).then((res) => {
      if (res.data.success) {
        setInfopost(res.data.success);
      } else {
        replace(`/404`);
      }
    });
  }

  useEffect(() => {
    getContentPost();
  }, []);

  function textToSpeech(action: string) {
    const text =
      'In  ancient Rome, there was the habit of celebrating the birthday of a person. There weren’t parties like we know today, but cakes were prepared and offers were made. Then, the habits of wishing happy birthday, giving gifts and lighting candles became popular as a way to protect the birthday person from devils and ensure good things to the next year in the person’s life. The celebrations only became popular like we know today after fourteen centuries, in a collective festival performed in Germany';
    const value = new SpeechSynthesisUtterance(text);
    if (action == 'play') {
      window.speechSynthesis.speak(value);
      setIsPlaying(true);
    } else if (action == 'pause') {
      window.speechSynthesis.pause();
      setIsPause(true);
    } else if (action == 'resume') {
      window.speechSynthesis.resume();
      setIsPause(false);
    } else if (action == 'stop') {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPause(false);
    }
  }

  return {
    data: {
      infopost,
      isPlaying,
      isPause,
    },
    methods: {
      textToSpeech,
    },
  };
};

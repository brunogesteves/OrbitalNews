'use client';
import { useEffect, useState } from 'react';
import { setCookie } from 'cookies-next';

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
      if (res.data) {
        setInfopost(res.data.success);
      } else {
        replace(`/404`);
      }
    });
  }

  useEffect(() => {
    getContentPost();
  }, []);

  useEffect(() => {
    setCookie('idPost', infopost?.id);
  }, [infopost]);

  function textToSpeech(action: string) {
    const text = infopost?.audio;
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

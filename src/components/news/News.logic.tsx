'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { contentNewsProps } from '@/Utils/types';

export const useLogic = (namePage: string) => {
  const [infopost, setInfopost] = useState<contentNewsProps>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPause, setIsPause] = useState<boolean>(false);
  async function getContentPost() {
    axios
      .get(`http://localhost:3000/api/getuniquepost/${namePage}`)
      .then((res) => setInfopost(res.data.success));
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

'use client';

import { api } from '@/Utils/api';
import { BannerProps } from '@/Utils/types';
import { useEffect, useState } from 'react';

export const useLogic = (
  bannerId: number,
  setIsOpen: (arg0: boolean) => void
) => {
  const [message, setmessage] = useState<string>('');
  const [initialValues, setInitialValues] = useState<BannerProps>({
    title: '',
    position: '',
    link: '',
    status: '',
    image: '',
    expirationDate: new Date(),
    file: [''],
  });

  async function getUniqueBanner() {
    if (bannerId != 0) {
      await api.get(`/banners/${bannerId}`).then((res) => {
        if (res.data) {
          setInitialValues(res.data.results);
          setIsOpen(true);
        }
      });
    } else {
      setInitialValues({
        title: '',
        position: '',
        link: '',
        status: '',
        image: '',
        expirationDate: new Date(),
        file: [''],
      });
    }
  }

  useEffect(() => {
    getUniqueBanner();
  }, [bannerId]);

  async function saveAd(
    values: { file: (string | Blob)[]; image: string | Blob },
    actions: { resetForm: () => void },
    methods: { setRunSpinner: (arg0: boolean) => void }
  ) {
    await api
      .post('/banners', values)
      .then(async (res) => {
        if (res.data.status) {
          const formData = new FormData();
          formData.append('file', values.file[0]);
          formData.append('name', values.image);
          formData.append('directory', '/banners/');
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          if (response) {
            methods.setRunSpinner(false);
            setmessage('Added');
            actions.resetForm();
          }
        }
      })
      .catch((error) => console.log(error));
  }

  async function updateBannerAd(
    values: BannerProps,
    methods: { setRunSpinner: (arg0: boolean) => void }
  ) {
    await api.put(`/banners/${bannerId}`, { values }).then((res) => {
      if (res.data.success) {
        if (res.data.success) {
          methods.setRunSpinner(false);
          setmessage('Updated');
        }
      }
    });
  }

  return {
    functions: {
      saveAd,
      updateBannerAd,
    },
    info: {
      bannerId,
      initialValues,
      message,
    },
  };
};

'use client';

import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const useLogic = () => {
  const [time, setTime] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [files, setFiles] = useState<any>();
  const [logo, setLogo] = useState<string>('logo.jpg');

  const router = useRouter();

  setInterval(() => {
    const date = new Date();
    const dateFormat = new Intl.DateTimeFormat('pt-BR', {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    });

    setTime(dateFormat.format(date));
  }, 1000);

  function closeModal() {
    setIsOpen(false);
  }

  async function logOut() {
    await signOut({
      redirect: false,
    });

    router.replace('/login');
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files?.map(
    (file: { name: React.Key | null | undefined; preview: string }) => (
      <div
        className="inline border-2 border-[#eaeaea] mb-8 mr-8 w-full h-auto"
        key={file.name}
      >
        <div className="flex overflow-hidden h-full w-full">
          <Image
            src={file?.preview}
            width={100}
            height={100}
            alt="file_preview"
            className="block w-full h-auto"
            onLoad={() => {
              URL.revokeObjectURL(file?.preview);
              setFiles(files);
            }}
          />
        </div>
      </div>
    )
  );

  async function uploadLogotype() {
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('name', 'logo');
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    if (response) {
      setLogo(`logo.jpg?cache=${new Date().valueOf()}`);
    }
  }

  return {
    data: {
      time,
      isOpen,
      thumbs,
      files,
      logo,
    },
    methods: {
      setIsOpen,
      closeModal,
      getRootProps,
      getInputProps,
      uploadLogotype,
      logOut
    },
  };
};

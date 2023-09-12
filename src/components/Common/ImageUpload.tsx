'use client';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const ImageUpload = (props: { file: (arg0: any) => void }) => {
  const [files, setFiles] = useState<any>();

  useEffect(() => {}, []);

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
        <div className=" flex overflow-hidden h-full w-full">
          <Image
            src={file?.preview}
            width={100}
            height={100}
            alt="file_preview"
            className="block w-full h-auto"
            onLoad={() => {
              URL.revokeObjectURL(file?.preview);
              props.file(files);
            }}
          />
        </div>
      </div>
    )
  );

  return (
    <section className="container cursor-pointer">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </div>
      <aside className="flex flex-row flex-wrap mt-8">{thumbs}</aside>
    </section>
  );
};

export default ImageUpload;

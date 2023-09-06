'use client';
import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import 'suneditor/dist/css/suneditor.min.css';
import SunEditorCore from 'suneditor/src/lib/core';
import type { UploadBeforeHandler } from 'suneditor-react/dist/types/upload';

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

interface editorProps {
  contentPost: (content: string) => void;
  defaultContent: string;
}

const Editor = (props: editorProps) => {
  const editor = useRef<SunEditorCore>();
  // const [contentPost, setcontentPost] = useState();

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;

    editor.current.setToolbarButtons([
      [
        'font',
        'fontSize',
        'formatBlock',
        'paragraphStyle',
        'blockquote',
        'bold',
        'underline',
        'italic',
        'strike',
        'subscript',
        'superscript',
        'fontColor',
        'hiliteColor',
        'textStyle',
        'removeFormat',
        'outdent',
        'indent',
        'align',
        'horizontalRule',
        'list',
        'lineHeight',
        'table',
        'link',
        'image',
        'audio',
        'math',
        'imageGallery',
        'fullScreen',
        'showBlocks',
        'codeView',
        'save',
        'template',
      ],
    ]);
  };

  function handleImageUploadBefore(
    files: File[],
    info: object,
    uploadHandler: UploadBeforeHandler
  ): undefined {
    const formData = new FormData();
    const res = formData.append('file', files[0]);
    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const response = {
      result: [
        {
          url: `http://localhost:3000`,
          name: files[0].name,
          size: files[0].size,
        },
      ],
    };

    uploadHandler(response);
    if (response) {
      editor.current?.insertHTML(
        `<img src="/${files[0].name}" alt=${files[0].name}>`
      );
    }
  }

  return (
    <SunEditor
      getSunEditorInstance={getSunEditorInstance}
      onImageUploadBefore={handleImageUploadBefore}
      placeholder="Crie o post....É obrigatório"
      setOptions={{
        imageGalleryUrl: 'http://localhost:3000/api/allimages',
      }}
      setContents={props.defaultContent}
      lang={'pt_br'}
      height="70vh"
      onChange={(e) => props.contentPost(e)}
    />
  );
};

export default Editor;

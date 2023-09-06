'use client';
import React, { FC } from 'react';

import RootAdminLayout from '@/components/admin/Layout';
import ContentEdit from '@/components/admin/addEdit/edit/ContentEdit.view';

interface pageProps {
  params: { id: number };
}

const page: FC<pageProps> = ({ params }) => {
  return (
    <RootAdminLayout>
      <ContentEdit id={params.id} />
    </RootAdminLayout>
  );
};

export default page;

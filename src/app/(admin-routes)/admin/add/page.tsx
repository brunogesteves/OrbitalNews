'use client';
import React from 'react';

import RootAdminLayout from '@/components/admin/Layout';
import ContentAdd from '@/components/admin/addEdit/add/ContentAdd.view';

const page = () => {
  return (
    <RootAdminLayout>
      <ContentAdd />
    </RootAdminLayout>
  );
};

export default page;

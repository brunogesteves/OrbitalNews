import React from 'react';

import RootAdminLayout from '@/components/admin/Layout';
import AllNews from '@/components/admin/Allnews/AllNews.view';

const Admin = () => {
  return (
    <RootAdminLayout>
      <AllNews />
    </RootAdminLayout>
  );
};

export default Admin;

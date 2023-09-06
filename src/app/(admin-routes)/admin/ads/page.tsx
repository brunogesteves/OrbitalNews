import React from 'react';

import RootAdminLayout from '@/components/admin/Layout';
import Ads from '@/components/admin/Ads/Ads.view';

const page = () => {
  return (
    <RootAdminLayout>
      <Ads />
    </RootAdminLayout>
  );
};

export default page;

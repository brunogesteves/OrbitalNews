import React from 'react';

import RootAdminLayout from '@/components/admin/Layout';
import AdTop from '@/components/admin/Ads/top/TopAd.view';

const page = () => {
  return (
    <RootAdminLayout>
      <AdTop />
    </RootAdminLayout>
  );
};

export default page;

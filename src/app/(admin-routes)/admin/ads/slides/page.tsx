import React from 'react';

import RootAdminLayout from '@/components/admin/Layout';
import SlidesAd from '@/components/admin/Ads/slides/SlidesAd.view';

const page = () => {
  return (
    <RootAdminLayout>
      <SlidesAd />
    </RootAdminLayout>
  );
};

export default page;

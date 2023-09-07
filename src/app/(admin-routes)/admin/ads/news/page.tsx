import React from 'react';

import RootAdminLayout from '@/components/admin/Layout';
import NewsAd from '@/components/admin/Ads/news/NewsAd.view';

const page = () => {
  return (
    <RootAdminLayout>
      <NewsAd />
    </RootAdminLayout>
  );
};

export default page;

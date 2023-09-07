import { FC } from 'react';
import axios from 'axios';
import Link from 'next/link';

import Footer from '@/components/common/Footer';
import Header from '@/components/home/Header';
import Content from '@/components/news/News.view';

interface pageProps {
  params: { news: string };
}

const PageNotFound: FC<pageProps> = ({ params }) => {
  return (
    <>
      <Header />
      <section className="w-full h-screen">
        <div className="w-full flex justify-between my-2 gap-x-2 max-sm:flex-col">
          <div className="w-2/6">{/* <Adsense /> */}</div>
          <div className="w-full text-center">Page Not Found</div>
          <div className="flex flex-col w-2/6 max-sm:w-full">
            <div className="flex justify-center text-xl mb-3 max-sm:mb-6">
              <span className="font-bold">Outras Notícias</span>
            </div>
            {/* <MoreArticles /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default PageNotFound;

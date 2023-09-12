import { cookies } from 'next/headers';
import Link from 'next/link';

import Header from '@/components/home/Header/Header.view';
import Content from '@/components/news/News.view';
import IsLoggedArea from '@/components/Common/isLoggedArea';
import MoreArticles from '@/components/MoreArticles/MoreArticles.view';

interface pageProps {
  params: { news: string };
}

const news: React.FC<pageProps> = ({ params }) => {
  return (
    <>
      <IsLoggedArea />
      <Header />
      <section className="w-full h-auto">
        <div className="w-full flex justify-between my-2 gap-x-2 max-sm:flex-col">
          <div className="w-2/6">Adsense </div>
          <div className="w-full">
            <Content namepage={params.news} />
          </div>
          <div className="flex flex-col w-2/6 max-sm:w-full">
            <div className="flex justify-center text-xl mb-3 max-sm:mb-6">
              <span className="font-bold">You might like</span>
            </div>
            <MoreArticles namepage={params.news} />
          </div>
        </div>
      </section>
    </>
  );
};

export default news;

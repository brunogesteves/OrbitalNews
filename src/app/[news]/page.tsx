import { cookies } from 'next/headers';
import Link from 'next/link';

import Header from '@/components/home/Header/Header.view';
import Content from '@/components/news/News.view';

interface pageProps {
  params: { news: string };
}

const news: React.FC<pageProps> = ({ params }) => {
  const cookieStore = cookies();
  const isLogged = cookieStore.get('next-auth.session-token');
  const idPost = cookieStore.get('idPost');
  return (
    <>
      {isLogged?.value ? (
        <div className="h-10 bg-black w-full flex items-center">
          <span className="text-white ">
            You are logged:{' '}
            <Link
              href={`/admin/edit/${idPost?.value}`}
              className="hover:underline"
            >
              Edit Post here{' '}
            </Link>
          </span>
        </div>
      ) : (
        ''
      )}
      <Header />
      <section className="w-full h-auto">
        <div className="w-full flex justify-between my-2 gap-x-2 max-sm:flex-col">
          <div className="w-2/6">{/* <Adsense /> */}</div>
          <div className="w-full">
            <Content namepage={params.news} />
          </div>
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

export default news;

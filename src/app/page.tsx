import { cookies } from 'next/headers';

import FirstNews from '@/components/home/FirstNews';
import Header from '@/components/home/Header/Header.view';
import NewsLeft from '@/components/home/NewsLeft';
import NewsRight from '@/components/home/NewsRight';
import Slidenews from '@/components/home/Slides/Slidenews.view';
import Link from 'next/link';

export default async function Home() {
  const cookieStore = cookies();
  const isLogged = cookieStore.get('next-auth.session-token');

  return (
    <>
      {isLogged?.value ? (
        <div className="h-10 bg-black w-full flex items-center max-md:hidden">
          <span className="text-white ">
            You are logged:{' '}
            <Link href={`/admin`} className="hover:underline">
              Enter Admin here
            </Link>
          </span>
        </div>
      ) : (
        ''
      )}
      <Header />
      <main className="h-auto mx-3 max-sm:mx-0 ">
        <section className="w-full h-auto flex justify-center py-2 max-md:flex-col max-sm:mt-2 max-sm:gap-y-2 ">
          <NewsLeft />
          <Slidenews />
        </section>
        <section className="flex justify-between w-full h-auto max-lg:flex-col mt-3">
          <FirstNews />
          <NewsRight />
        </section>
      </main>
    </>
  );
}

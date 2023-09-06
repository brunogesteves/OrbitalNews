import Footer from '@/components/common/Footer';
import FirstNews from '@/components/home/FirstNews';
import Header from '@/components/home/Header';
import NewsLeft from '@/components/home/NewsLeft';
import NewsRight from '@/components/home/NewsRight';
import Slidenews from '@/components/home/Slidenews';
import axios from 'axios';

export default async function Home() {
  // const fecthNewsLeft = await axios
  //   .get('http://localhost:3000/newsleft')
  //   .then((res) => {
  //     console.log('fecthNewsLeft: ', res.data);
  //     return res.data;
  //   });

  // const slideNews = await axios
  //   .get('http://localhost:3000/slidenews')
  //   .then((res) => {
  //     console.log('slideNews: ', res.data);
  //     return res.data;
  //   });

  // const fecthNewsRight = await axios
  //   .get('http://localhost:3000/newsright')
  //   .then((res) => {
  //     console.log('fecthNewsRight: ', res.data);
  //     return res.data;
  //   });

  // const firstNews = await axios
  //   .get('http://localhost:3000/firstnews')
  //   .then((res) => {
  //     console.log('firstnews: ', res.data);
  //     return res.data;
  //   });

  return (
    <>
      <Header />
      <main className="h-auto mx-3 max-sm:mx-0 ">
        <hr className="h-1 bg-black max-sm:hidden" />
        <section className="w-full h-auto flex justify-center py-2 max-md:flex-col max-sm:mt-2 ">
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

import Header from '@/components/home/Header/Header.view';
import IsLoggedArea from '@/components/Common/isLoggedArea';
import ContentCategory from '@/components/ContentCategory/ContentCategory.view';

interface pageProps {
  params: { category: string };
}

const news: React.FC<pageProps> = ({ params }) => {
  return (
    <>
      <IsLoggedArea />
      <Header />
      <section className="w-full h-screen mt-3">
        <ContentCategory category={params.category} />
      </section>
    </>
  );
};

export default news;

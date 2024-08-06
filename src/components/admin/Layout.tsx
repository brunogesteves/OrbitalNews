import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';
import Header from '@/components/admin/Header/Header.view';
import Sidebar from '@/components/admin/Sidebar';

export default async function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header username={''} />
      <div className="flex justify-start items-start w-auto h-auto bg-white">
        <Sidebar />
        <div className="h-screen overflow-y-auto w-full ">{children}</div>
      </div>
    </>
  );
}

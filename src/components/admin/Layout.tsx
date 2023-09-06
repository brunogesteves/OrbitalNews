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
      <div className="flex justify-start items-start h-full bg-white">
        <Sidebar />
        <div className="h-full overflow-y-auto w-full">{children}</div>
      </div>
    </>
  );
}

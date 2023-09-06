import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const PrivateAdminLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect('/login');
  }

  return <div>{children}</div>;
};

export default PrivateAdminLayout;

import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const PrivateAuthLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(nextAuthOptions);
  if (session) {
    redirect('/admin');
  }

  return <div>{children}</div>;
};

export default PrivateAuthLayout;

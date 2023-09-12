import React from 'react';
import { cookies } from 'next/headers';
import Link from 'next/link';

const IsLoggedArea = () => {
  const cookieStore = cookies();
  const isLogged = cookieStore.get('next-auth.session-token');
  const idPost = cookieStore.get('idPost');
  return isLogged?.value ? (
    <div className="h-10 bg-black w-full flex items-center">
      <span className="text-white ">
        You are logged:{' '}
        <Link href={`/admin/edit/${idPost?.value}`} className="hover:underline">
          Edit Post here{' '}
        </Link>
      </span>
    </div>
  ) : (
    ''
  );
};

export default IsLoggedArea;

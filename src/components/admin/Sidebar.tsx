import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <div className=" flex justify-start items-center text-start flex-col w-1/6 h-screen text-white gap-y-2 pt-4 text-xl bg-black">
      <div className="w-3/4 flex justify-start group flex-col cursor-pointer">
        <Link href="/admin">Posts</Link>
        <div className="hidden group-hover:block mt-3 cursor-pointer">
          <Link href="/admin/add">Adicionar novo Post</Link>
        </div>
      </div>

      <div className="w-3/4 cursor-pointer">
        <Link href="/admin/ads">Ads</Link>
      </div>
      <div className="w-3/4 cursor-pointer">
        <Link href="/search">Search</Link>
      </div>
      <div className="w-3/4 cursor-pointer">
        <Link href="/">Home Page</Link>
      </div>
    </div>
  );
};

export default Sidebar;

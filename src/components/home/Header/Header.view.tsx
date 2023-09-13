'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { AiOutlineMenu } from 'react-icons/ai';

import { useLogic } from './Header.logic';

const Header = () => {
  const { data, methods } = useLogic();

  return (
    <>
      <div className="flex justify-center h-56 p-4 gap-x-3 max-sm:px-0 ">
        <div className="w-1/4 flex justify-center max-sm:hidden">
          <Link href="/">
            <Image
              src="/logo.jpg"
              alt="logo"
              width={200}
              height={500}
              className="h-44"
              priority
            />
          </Link>
        </div>
        <Slider
          {...data.settings}
          className="w-3/4 h-auto max-sm:my-20 max-sm:w-full"
        >
          {data.slideBanner?.map((banner) => (
            <Link href={banner.link} target="_blank" key={banner.id}>
              <Image
                src={`/banners/${banner.image}`}
                alt={banner.image}
                width={500}
                height={500}
                className="w-full h-44 object-cover"
              />
            </Link>
          ))}
        </Slider>
      </div>
      <hr className="h-1 bg-black mx-3 max-sm:hidden" />
      <div className="mx-3 max-sm:hidden flex justify-start gap-x-3 capitalize ">
        {data.allCategories
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((cat) => (
            <Link href={`/category/${cat.name.toLowerCase()}`} key={cat.id}>
              <span className="text-xl">{cat.name}</span>
            </Link>
          ))}
      </div>
      <div className=" 2xl:hidden xl:hidden lg:hidden md:hidden  w-full fixed h-screen top-0 z-50 flex justify-start items-start flex-col">
        <div className=" bg-black h-20 flex items-center px-3 gap-x-3 w-full">
          <Link href="/">
            <Image
              src="/logo.jpg"
              alt="logo"
              width={200}
              height={500}
              className="h-14 w-16"
              priority
            />
          </Link>
          <AiOutlineMenu
            color="#fff"
            size={25}
            onClick={() => methods.setOpenDrawer(!data.openDrawer)}
          />
        </div>
        <div
          className={`h-20 w-auto  flex items-center bg-white  px-10 rounded-r-md flex-col transition duration-150 ease-out ${
            data.openDrawer ? 'translate-x-0' : '-translate-x-64'
          }`}
        >
          {data.allCategories.map((cat) => (
            <Link href={`/category/${cat.name.toLowerCase()}`} key={cat.id}>
              <span className="text-xl capitalize">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;

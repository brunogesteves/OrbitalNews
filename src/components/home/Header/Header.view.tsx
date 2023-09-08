'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { BiMenu } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { useLogic } from './Header.logic';

const Header = () => {
  const { data, methods } = useLogic();

  return (
    <>
      <div className="flex justify-center h-56 p-4 gap-x-3 max-sm:hidden">
        <div className="w-1/4 flex justify-center">
          <Link href="/">
            <Image
              src="/logo.jpg"
              alt="logo"
              width={200}
              height={500}
              className="h-full"
              priority
            />
          </Link>
        </div>
        <Slider {...data.settings} className="w-3/4 h-full">
          {data.slideBanner?.map((banner) => (
            <Link href={banner.link} target="_blank" key={banner.id}>
              <Image
                src={`/banners/${banner.image}`}
                alt={banner.image}
                width={500}
                height={500}
                className="w-full h-28 object-cover"
              />
            </Link>
          ))}
        </Slider>
      </div>
      <div className="hidden max-sm:flex max-sm:flex-col">
        <div className="bg-black h-20"></div>
        <nav className="bg-[#251014] w-full relative">
          <div className="w-1/4 flex justify-start py-3 pl-3 gap-x-3 items-center">
            {data.isDrawerOpen ? (
              <IoMdClose
                color="#fff"
                onClick={() => methods.setIsDrawerOpen(false)}
              />
            ) : (
              <BiMenu
                color="#fff"
                onClick={() => methods.setIsDrawerOpen(true)}
              />
            )}

            <Link href="/">
              <Image
                src="/logo.jpg"
                alt="logo"
                className="rounded-full w-10 h-10"
                width={10}
                height={10}
              />
            </Link>
          </div>
          <ul
            className={`absolute top-16 bg-white h-auto w-1/2 px-2 z-10 transition duration-150 ease-out ${
              data.isDrawerOpen ? 'translate-x-0' : '-translate-x-64'
            }`}
          >
            <li className="py-3">
              <a href="#" className="p-3 text-xl lowercase">
                HOME
              </a>
            </li>
            <li>
              <a href="#">li</a>
            </li>
            <li>
              <a href="#">li</a>
            </li>
            <li>
              <a href="#">li</a>
            </li>
            <li>
              <a href="#">li</a>
            </li>
            <li>
              <a href="#">li</a>
            </li>
            <li>
              <a href="#">li</a>
            </li>
            <li>
              <a href="#">li</a>
            </li>
            <li>
              <a href="#">li</a>
            </li>
            <li>
              <a href="#">li</a>
            </li>
            <li>
              <a href="#">li</a>
            </li>
          </ul>
        </nav>
        {/* {{ Slider }} */}
      </div>
    </>
  );
};

export default Header;

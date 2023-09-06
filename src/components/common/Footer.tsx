'use client';
import React from 'react';
import Image from 'next/image';
import { BsArrowUp } from 'react-icons/bs';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <div className=" bg-black text-white flex justify-center items-center gap-x-5 py-3">
        <Image
          src="/logo.jpg"
          alt="logo"
          width={200}
          height={500}
          className="w-10"
        />
        <span> Orbital Channel - Direitos Reservados </span>
      </div>
      <div
        className="fixed bottom-7 right-7 bg-slate-300 rounded-md p-2 cursor-pointer"
        onClick={() => scrollToTop()}
      >
        <BsArrowUp color="#000" size={30} />
      </div>
    </>
  );
};

export default Footer;

'use client';
import React from 'react';
import Image from 'next/image';

import { useLogic } from './TopAd.logic';
import { AiFillDelete } from 'react-icons/ai';
import { NewAd } from '../UpdateAddAd/UpdateAddAd.view';

const TopAd = () => {
  const { data, methods } = useLogic();

  return (
    <div className="w-full flex justify-center items-center flex-col ">
      <button
        className="bg-slate-300 text-black py-2 rounded-md my-2 w-20"
        onClick={() => methods.setIsOpen(true)}
      >
        Add Banner
      </button>

      <div className="text-3xl">Top banners</div>
      {data.banners.map((banner) => (
        <div key={banner.id} className="w-full mb-5">
          <div className="flex justify-center">
            <Image
              src={`/banners/${banner.image}`}
              alt={banner.image}
              width={500}
              height={500}
              className="w-1/2 h-auto "
            />
          </div>
          <div className="h-auto w-full flex justify-between items-center px-10">
            <div>
              <span>Status: </span>
              <select defaultValue={banner.status}>
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </div>
            <span>
              Expiration Date: {methods.toDate(banner.expirationDate)}
            </span>
            <span>Link: {banner.link}</span>

            <button
              className="bg-black hover:bg-red-700 px-3 py-1 rounded text-white m-3"
              onClick={() => methods.setBannerId(banner.id ?? 0)}
            >
              Update
            </button>
            <AiFillDelete
              size={20}
              color="red"
              className="cursor-pointer"
              onClick={() => {
                methods.setIdToDelete(banner?.id ?? 0);
              }}
            />
          </div>
        </div>
      ))}
      <NewAd data={data} methods={methods} />
    </div>
  );
};

export default TopAd;

/* eslint-disable @next/next/no-img-element */
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Modal from "react-modal";
import { CiCirclePlus } from "react-icons/ci";
import { HiCamera } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30 p-3">
      <div className="flex justify-between items-center  max-w-6xl mx-auto">
        {/* logo */}
        <Link href="/" className="block">
          Instagram
        </Link>
        {/* search bar */}
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[210px]"
        />
        {/* Menu Items */}
        {session ? (
          <div
            className="flex gap-2 items-center"
            onClick={() => setIsOpen(true)}
          >
            <CiCirclePlus className="cursor-pointer text-2xl transform hover:scale-125 transition-all hover:text-red-600" />
            <img
              src={session.user.image}
              alt={session.user.name}
              className="w-10 h-10 rounded-[50%] cursor-pointer"
              onClick={() => signOut()}
            />
          </div>
        ) : (
          <button
            className="text-sm font-semibold text-blue-500"
            onClick={() => signIn()}
          >
            Log In
          </button>
        )}
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          className="max-w-lg  w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
          onRequestClose={() => setIsOpen(false)}
          ariaHideApp={false}
        >
          <div className="flex flex-col justify-center items-center h-[100%]">
            <HiCamera className="text-5xl text-gray-400 cursor-pointer" />
          </div>
          <input
            type="text"
            maxLength="150"
            placeholder="Enter caption..."
            className="m-4 border-center w-full outline-none text-center focus:ring-0"
          />
          <button
            disabled
            className="w-full bg-red-600 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
          >
            Upload Post
          </button>

          <AiOutlineClose
            className="cursor-pointer absolute top-2 right-2 hover:text-red-600 transition duration-300"
            onClick={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default Header;

/* eslint-disable @next/next/no-img-element */
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Header() {
  const { data: session } = useSession();

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
          <img
            src={session.user.image}
            alt={session.user.name}
            className="w-10 h-10 rounded-[50%] cursor-pointer"
            onClick={() => signOut()}
          />
        ) : (
          <button
            className="text-sm font-semibold text-blue-500"
            onClick={() => signIn()}
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Theme from "../theme";
import { UserJwtPayload } from "@/serverActions/serverCookieUtils";
import K from "@/Utility/constants";

export default function Hamburger({
  decodedToken,
}: {
  decodedToken: UserJwtPayload | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex md:hidden" ref={menuRef}>
      <button
        className="p-2 text-gray-500 transition hover:text-gray-500/75"
        aria-label="Open navigation menu"
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 dark:bg-gray-950 bg-white border border-gray-800 rounded shadow-lg">
          <Link
            href={K.Links.Home}
            className="block px-4 py-2 dark:text-white text-gray-800 dark:hover:bg-gray-700 hover:bg-gray-200"
          >
            Home
          </Link>
          <Link
            href={K.Links.About}
            className="block px-4 py-2 dark:text-white text-gray-800 dark:hover:bg-gray-700 hover:bg-gray-200"
          >
            About
          </Link>
          {/* <Link
            href={K.Links.Contact}
            className="block px-4 py-2 dark:text-white text-gray-800 dark:hover:bg-gray-700 hover:bg-gray-200"
          >
            Contact
          </Link>
          <Link
            href={K.Links.Blog}
            className="block px-4 py-2 dark:text-white text-gray-800 dark:hover:bg-gray-700 hover:bg-gray-200"
          >
            Blog
          </Link> */}
          {decodedToken ? (
            <>
              <Link
                href={K.Links.Dashboard}
                className="block px-4 py-2 dark:text-white text-gray-800 dark:hover:bg-gray-700 hover:bg-gray-200"
              >
                App
              </Link>
            </>
          ) : (
            <></>
          )}
          <div className="block px-4 py-2 dark:text-white text-gray-800 dark:hover:bg-gray-700 hover:bg-gray-200">
            <Theme />
          </div>
        </div>
      )}
    </div>
  );
}

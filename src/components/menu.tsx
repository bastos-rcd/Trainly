"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  const HeaderLink = ({ link, title }: { link: string; title: string }) => (
    <Link href={link} className="text-lg text-white font-extralight">
      {title}
    </Link>
  );

  return (
    <header className="w-full flex flex-row justify-between items-center bg-slate-200 p-2">
      <Link href="/">
        <Image
          src="/favicon.webp"
          alt="logo"
          width={50}
          height={50}
          loading="eager"
        />
      </Link>

      <button onClick={toggleMenu} className="rounded-xl bg-slate-600 p-2">
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="#FFFFFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M1 1h15M1 7h15M1 13h15"
          ></path>
        </svg>
      </button>

      <nav
        className={`absolute ${
          isOpen ? "flex" : "hidden"
        } flex-col justify-center items-center top-16 right-2 bg-slate-600 rounded-xl p-4 gap-y-2`}
      >
        <HeaderLink link="/import" title="Importer" />
        <HeaderLink link="/export" title="Exporter" />
      </nav>
    </header>
  );
}

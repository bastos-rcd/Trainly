import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function App() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-100">
      <header className="fixed top-0 z-50 w-full flex flex-row justify-between items-center bg-transparent p-4 md:p-8">
        <Link to="/">
          <img className="rounded-xl w-10 h-auto" src="/favicon.webp" />
        </Link>

        <button
          className="flex justify-center items-center rounded-xl bg-[#1f1f1f] p-2"
          onClick={toggleMenu}
        >
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
          hidden={isOpen}
          className="text-white font-extralight absolute top-20 right-4 bg-[#1f1f1f] rounded-xl flex-col justify-center items-center p-4 gap-y-2"
        >
          {/* <Link to="/">Home</Link> */}
        </nav>
      </header>

      <div className="flex-1 flex flex-col justify-start items-center overflow-y-auto pt-16 px-4 gap-y-4">
        <Outlet />
      </div>
    </div>
  );
}

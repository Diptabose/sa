"use client";
import React, { useState } from "react";
import Link from "next/link";
import Logout from "../log/Logout";
import Image from "next/image";



const routerMap: Record<string, string> = {
  Inbox: "home",
  Metrics: "dashboard",
  Settings: "settings",
};

const routeNames = Object.keys(routerMap);

const SetNav = () => {

  const [showMenu, setShowMenu] = useState(false);

  return (
    <header>
      <nav className="text-content-white bg-primitives-accordion-blue w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between mx-auto p-2">
          <Link
            href="https://www.merilytics.com/"
            className=" flex-1 flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image src="/logo.svg" alt="logo" width={130} height={20} />
          </Link>

          <span className="flex-1 md:text-center">
            Sentiment Analysis Application
          </span>
          <div className="md:hidden flex-1  justify-end flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`md:flex-1 md:justify-end items-center justify-between ${
              showMenu ? "" : "hidden"
            } w-full md:flex md:w-fit md:order-2`}
            id="navbar-sticky"
          >
            <ul className="text-sm flex flex-col p-4 md:p-0 mt-4 gap-small rtl:space-x-reverse md:flex-row md:mt-0">
              <Logout label="Logout" />
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default SetNav;

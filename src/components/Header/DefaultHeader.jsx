import React from "react";

export default function DefaultHeader() {
  return (
    <>
      <div className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#243647] px-10 py-3">
        <a href="/">
          <div className="flex items-center gap-2 text-white">
            <img width="35" height="30" src="../logo.png" />
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
              HelpEZ
            </h2>
          </div>
        </a>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <a
              className="text-white text-sm font-medium leading-normal"
              href="#"
            >
              Volunteer
            </a>
            <a
              className="text-white text-sm font-medium leading-normal"
              href="/organisation"
            >
              Organisation
            </a>
            <a
              className="text-white text-sm font-medium leading-normal"
              href="/dashboard"
            >
              Admin
            </a>
          </div>
          {/* <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#243647] text-white text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Login</span>
          </button> */}
        </div>
      </div>
    </>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function DefaultHeader() {
  return (
    <>
      <div className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#243647] px-10 py-5">
        <Link to="/">
          <div className="flex items-center gap-2 text-white">
            <img width="35" height="30" src="../logo.png" />
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
              HelpEZ
            </h2>
          </div>
        </Link>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <Link to="/volunteer">
              <button className="text-white text-sm font-medium leading-normal">
                Volunteer
              </button>
            </Link>
            <Link to="/organisation">
              <button className="text-white text-sm font-medium leading-normal">
                Organisation
              </button>
            </Link>
            <Link to="admin">
              <button className="text-white text-sm font-medium leading-normal">
                Admin
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

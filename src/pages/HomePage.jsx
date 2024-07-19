import React from "react";
import { Link } from "react-router-dom";
import DefaultHeader from "../components/Header/DefaultHeader";

export default function HomePage() {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-[#111a22]">
        <DefaultHeader />
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="@container">
                <div className="@[480px]:p-4">
                  <div
                    className="flex rounded-xl min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-end px-5 pb-10"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("../images/home.png")`,
                    }}
                  >
                    <div className="flex flex-col gap-2 text-left">
                      <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                        Support When It Matters Most
                      </h1>
                      <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                        Extend your support to those in need and keep the world
                        safe!
                      </h2>
                    </div>
                    <div className="flex-wrap gap-1 flex">
                      <Link to="https://github.com/suraj719/helpEZ">
                        <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-bold ">
                          <span className="truncate">Get Started</span>
                        </button>
                      </Link>
                      <span className="text-slate-300 self-center">
                        by downloading our app
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-10 px-4 py-10 @container">
                <div className="flex flex-col gap-4">
                  <h1 className="text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                    How we can help you
                  </h1>
                  <p className="text-white text-base font-normal leading-normal max-w-[720px]">
                    We are a non-profit organization that provides free aid to
                    those affected by disasters.
                  </p>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
                  <div className="flex flex-1 gap-3 rounded-lg border border-[#344d65] bg-[#1a2632] p-4 flex-col">
                    <div
                      className="text-white"
                      data-icon="House"
                      data-size="24px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-white text-base font-bold leading-tight">
                        Request Aid
                      </h2>
                      <p className="text-[#93adc8] text-sm font-normal leading-normal">
                        We provide free aid to those affected by disasters.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 gap-3 rounded-lg border border-[#344d65] bg-[#1a2632] p-4 flex-col">
                    <div
                      className="text-white"
                      data-icon="UsersThree"
                      data-size="24px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-white text-base font-bold leading-tight">
                        Join as an Organization
                      </h2>
                      <p className="text-[#93adc8] text-sm font-normal leading-normal">
                        Join as an organization to request aid for your
                        community.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 gap-3 rounded-lg border border-[#344d65] bg-[#1a2632] p-4 flex-col">
                    <div
                      className="text-white"
                      data-icon="Truck"
                      data-size="24px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M247.42,117l-14-35A15.93,15.93,0,0,0,218.58,72H184V64a8,8,0,0,0-8-8H24A16,16,0,0,0,8,72V184a16,16,0,0,0,16,16H41a32,32,0,0,0,62,0h50a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V120A7.94,7.94,0,0,0,247.42,117ZM184,88h34.58l9.6,24H184ZM24,72H168v64H24ZM72,208a16,16,0,1,1,16-16A16,16,0,0,1,72,208Zm81-24H103a32,32,0,0,0-62,0H24V152H168v12.31A32.11,32.11,0,0,0,153,184Zm31,24a16,16,0,1,1,16-16A16,16,0,0,1,184,208Zm48-24H215a32.06,32.06,0,0,0-31-24V128h48Z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-white text-base font-bold leading-tight">
                        Volunteer
                      </h2>
                      <p className="text-[#93adc8] text-sm font-normal leading-normal">
                        Join as a volunteer to help us with our mission.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex px-4 py-3 justify-start">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#243647] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Admin Dashboard</span>
                </button>
              </div>
              <p className="text-[#93adc8] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline">
                Or, you can
              </p>
              <div className="flex px-4 py-3 justify-start">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#243647] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Log in as an organization</span>
                </button>
              </div>
              <p className="text-[#93adc8] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline">
                Or, you can
              </p>
              <div className="flex px-4 py-3 justify-start">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#243647] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Sign up as a volunteer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

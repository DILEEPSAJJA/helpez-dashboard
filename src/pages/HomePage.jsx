import React from "react";
import { Link } from "react-router-dom";
import DefaultHeader from "../components/Header/DefaultHeader";
import Hero from "../components/Hero";
export default function HomePage() {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-[#111a22]">
        <DefaultHeader />
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-4 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[1160px] flex-1">
              <div className="@container">
                <div>
                  <div
                    className="flex rounded-xl min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-end px-5 pb-10"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%), url("../images/home.png")`,
                    }}
                  >
                    <div className="flex flex-col gap-2 text-left">
                      <h1 className="text-white text-4xl font-black">
                        Support When It Matters Most
                      </h1>
                      <h2 className="text-white text-md font-normal leading-[20px]">
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
              <div className="my-10">
                <Hero />
              </div>
              <div className="flex flex-col gap-10 px-4 py-10 @container">
                <div className="flex flex-col gap-4">
                  <h1 className="text-white tracking-light text-[32px] font-bold max-w-[720px]">
                    How we can help you
                  </h1>
                  <p className="text-white text-base font-normal leading-normal max-w-[720px]">
                    We provide immediate relief and support to individuals and
                    communities affected by disasters through our network of
                    volunteers and partner organizations.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-1 gap-3 rounded-lg border border-[#344d65] bg-[#1a2632] p-4 flex-col">
                    <div
                      className="text-white"
                      data-size="24px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="30px"
                        viewBox="0 -960 960 960"
                        width="30px"
                        fill="#e8eaed"
                      >
                        <path d="M104.62-563.46q0-88.46 37.57-163.31 37.58-74.84 101.43-126.38l36.99 46.69q-53.46 43.23-84.73 106-31.26 62.77-31.26 137h-60Zm690.76 0q0-74.23-31.26-137.19-31.27-62.96-84.73-106.2l36.99-46.3q63.85 51.54 101.43 126.38 37.57 74.85 37.57 163.31h-60ZM180-204.62v-59.99h72.31v-298.47q0-80.69 49.81-142.69 49.8-62 127.88-79.31V-810q0-20.77 14.62-35.38Q459.23-860 480-860q20.77 0 35.38 14.62Q530-830.77 530-810v24.92q78.08 17.31 127.88 79.31 49.81 62 49.81 142.69v298.47H780v59.99H180Zm300-293.07Zm0 405.38q-29.92 0-51.11-21.19-21.2-21.19-21.2-51.12h144.62q0 29.93-21.2 51.12Q509.92-92.31 480-92.31Zm-167.69-172.3h335.38v-298.47q0-69.46-49.11-118.57-49.12-49.12-118.58-49.12-69.46 0-118.58 49.12-49.11 49.11-49.11 118.57v298.47Z" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-white text-base font-bold leading-tight">
                        Real-time Alerts
                      </h2>
                      <p className="text-[#93adc8] text-sm font-normal leading-normal">
                        Stay informed with real-time alerts and updates on
                        incidents happening around you.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 gap-3 rounded-lg border border-[#344d65] bg-[#1a2632] p-4 flex-col">
                    <div
                      className="text-white"
                      data-size="24px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="30px"
                        viewBox="0 -960 960 960"
                        width="30px"
                        fill="#e8eaed"
                      >
                        <path d="M633.85-452.31 475.54-605.46q-28.69-27.69-48.27-61.65-19.58-33.96-19.58-73.97 0-49.55 34.69-84.23Q477.06-860 526.61-860q32.39 0 59.81 15.62 27.43 15.61 47.43 39.77 20-24.16 47.42-39.77Q708.69-860 741.08-860q49.55 0 84.23 34.69Q860-790.63 860-741.08q0 40.01-19.27 73.97t-47.96 61.65L633.85-452.31Zm0-83.53 114.38-110.85q20.15-19.77 35.96-43Q800-712.92 800-741.08q0-24.69-17.12-41.8Q765.77-800 741.08-800q-19 0-34.77 9.92-15.77 9.93-27.85 25.16l-44.61 54.3-44.62-54.3q-12.08-15.23-27.85-25.16-15.76-9.92-34.77-9.92-24.69 0-41.8 17.12-17.12 17.11-17.12 41.8 0 28.16 15.81 51.39t35.96 43l114.39 110.85ZM268.08-216.92l290.3 82.15 238.77-74q-3.07-13.61-12.69-20.88t-21.77-7.27H566.8q-26.18 0-44.49-2-18.31-2-37.62-8.77l-90.3-29.85 17.76-58.77 81 28.16q18.16 6.15 41.93 8.38 23.77 2.23 67.61 2.85 0-14.85-6.69-25.62-6.69-10.77-17.62-14.54l-232.07-85.23q-1.16-.38-2.12-.57-.96-.2-2.11-.2h-74v206.16ZM68.08-100v-383.07h273.54q6.3 0 12.76 1.38 6.47 1.39 12 3.23l233.08 85.85q27.23 10.07 45.23 35.65 18 25.58 18 60.04h100q43.08 0 70.19 27.81Q860-241.31 860-196.92v32.3L560.38-71.54l-292.3-83.38V-100h-200Zm60-60h80v-263.08h-80V-160Zm505.77-550.62Z" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-white text-base font-bold leading-tight">
                        Volunteers
                      </h2>
                      <p className="text-[#93adc8] text-sm font-normal leading-normal">
                        Our dedicated volunteers are always ready to assist you
                        during challenging times.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 gap-3 rounded-lg border border-[#344d65] bg-[#1a2632] p-4 flex-col">
                    <div
                      className="text-white"
                      data-size="24px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30px"
                        height="30px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M247.42,117l-14-35A15.93,15.93,0,0,0,218.58,72H184V64a8,8,0,0,0-8-8H24A16,16,0,0,0,8,72V184a16,16,0,0,0,16,16H41a32,32,0,0,0,62,0h50a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V120A7.94,7.94,0,0,0,247.42,117ZM184,88h34.58l9.6,24H184ZM24,72H168v64H24ZM72,208a16,16,0,1,1,16-16A16,16,0,0,1,72,208Zm81-24H103a32,32,0,0,0-62,0H24V152H168v12.31A32.11,32.11,0,0,0,153,184Zm31,24a16,16,0,1,1,16-16A16,16,0,0,1,184,208Zm48-24H215a32.06,32.06,0,0,0-31-24V128h48Z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-white text-base font-bold leading-tight">
                        Request Aid
                      </h2>
                      <p className="text-[#93adc8] text-sm font-normal leading-normal">
                        We provide essential resources and support to those in
                        need during and after disasters.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-10 px-4 py-10 @container">
                <div className="flex flex-col gap-4">
                  <h1 className="text-white text-[32px] font-bold max-w-[720px]">
                    What you can do
                  </h1>
                  <p className="text-white text-base font-normal leading-normal max-w-[720px]">
                    Your contribution is vital to our mission. Here's how you
                    can make a difference:
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-1 gap-3 rounded-lg border border-[#344d65] bg-[#1a2632] p-4 flex-col">
                    <div
                      className="text-white"
                      data-size="24px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="40px"
                        viewBox="0 -960 960 960"
                        width="40px"
                        fill="#e8eaed"
                      >
                        <path d="M718.46-450v-60h144.62v60H718.46Zm45.69 269.23-115.69-86.77 36.46-47.84 115.69 86.76-36.46 47.85Zm-80.77-465.38L646.92-694l115.69-86.77 36.47 47.85-115.7 86.77ZM210-220.77v-156.15h-40.77q-29.92 0-51.11-21.2-21.2-21.19-21.2-51.11v-61.54q0-29.92 21.2-51.11 21.19-21.2 51.11-21.2h154.62L503.08-690v420L323.85-376.92H270v156.15h-60Zm233.08-155.84v-206.78l-102.62 60.31H169.23q-4.61 0-8.46 3.85-3.85 3.85-3.85 8.46v61.54q0 4.61 3.85 8.46 3.85 3.85 8.46 3.85h171.23l102.62 60.31Zm115.38 21.38v-249.54q23.54 21.31 37.92 53.69 14.39 32.39 14.39 71.08t-14.39 71.08q-14.38 32.38-37.92 53.69ZM300-480Z" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-white text-base font-bold leading-tight">
                        Spread Awareness
                      </h2>
                      <p className="text-[#93adc8] text-sm font-normal leading-normal">
                        spread awareness about disaster preparedness,disaster
                        management and our organization's mission.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 gap-3 rounded-lg border border-[#344d65] bg-[#1a2632] p-4 flex-col">
                    <div
                      className="text-white"
                      data-size="24px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="32px"
                        viewBox="0 -960 960 960"
                        width="32px"
                        fill="#e8eaed"
                      >
                        <path d="M718-327.23 618.23-426 661-468.15l57 56.38 141-141L901.77-511 718-327.23ZM440-501Zm0 354.07-86.61-77.84Q271.77-299 215.66-354.62q-56.12-55.61-90.77-101.57-34.66-45.96-49.77-86.43Q60-583.08 60-626q0-85.15 57.42-142.27 57.43-57.11 142.58-57.11 52.38 0 99 24.5t81 70.27q34.38-45.77 81-70.27 46.62-24.5 99-24.5 75.23 0 126.96 44.34 51.73 44.35 67.12 111.04H751q-13.77-44.61-50.31-70-36.54-25.39-80.69-25.39-49.85 0-88.19 27.5-38.35 27.5-72.27 77.89h-39.08q-33.69-50.77-73.38-78.08-39.7-27.31-87.08-27.31-57.77 0-98.88 39.7Q120-686 120-626q0 33.38 14 67.77 14 34.38 50 79.27 36 44.88 98 105.15T440-228q28.31-25.31 60.62-53.77 32.3-28.46 54.46-49.61l6.69 6.69L576.46-310l14.69 14.69 6.69 6.69q-22.76 21.16-54.26 48.93-31.5 27.77-59.43 53.07L440-146.93Z" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-white text-base font-bold leading-tight">
                        Help Others
                      </h2>
                      <p className="text-[#93adc8] text-sm font-normal leading-normal">
                        Help others by offering support to those affected by
                        disasters. Your contributions can make a significant
                        impact on their recovery and well-being.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 gap-3 rounded-lg border border-[#344d65] bg-[#1a2632] p-4 flex-col">
                    <div
                      className="text-white"
                      data-size="24px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="30px"
                        viewBox="0 -960 960 960"
                        width="30px"
                        fill="#e8eaed"
                      >
                        <path d="M480-60q-117 0-212.35-57.93-95.34-57.92-149.57-155.23v119.31h-60v-220h220v60H164.46q43.38 87.39 128.23 140.62Q377.54-120 480-120q73.46 0 137.81-27.15 64.34-27.16 112.65-74.12 48.31-46.96 77.58-110.92 29.27-63.96 31.58-137.81h59.99q-1.92 85.23-35.65 159.85-33.73 74.61-90.46 130.38Q716.77-124 641.19-92 565.61-60 480-60Zm-28.31-147.69v-50.46q-43.92-10.24-73.04-36.47-29.11-26.23-44.65-70.76L384.61-386q14.31 39.08 40.97 59.39 26.65 20.3 60.42 20.3 34.15 0 61.31-17.04 27.15-17.03 27.15-54.65 0-31.31-23.34-49.88-23.35-18.58-87.12-41.97-61.69-22.15-89-49.61-27.31-27.46-27.31-72.54 0-38.69 27.93-70.85 27.92-32.15 78.07-41v-48.46h54.62v48.46q33.69 2.62 62.04 25.35 28.34 22.73 40.88 54.65L561.85-604q-10.31-22.23-29.47-36.96-19.15-14.73-50.38-14.73-37.31 0-58.5 17.69-21.19 17.69-21.19 46T423-547.92q20.69 15.77 83.77 37.31 72 26 96.77 58.3Q628.31-420 628.31-378q0 28.62-10.58 50.23-10.58 21.62-27.65 36.35-17.08 14.73-38.89 23.27-21.81 8.53-44.88 12v48.46h-54.62ZM60.39-490q2.69-87.15 36.8-161.96 34.12-74.81 91.23-130.19 57.12-55.39 132.12-86.62Q395.54-900 480-900q115.85 0 212.35 58.12 96.5 58.11 149.57 156.58v-120.85h60v220h-220v-60h113.62Q753.31-732 668.27-786 583.23-840 480-840q-71.92 0-136.08 26.77-64.15 26.77-112.84 73.34-48.69 46.58-78.54 110.54-29.85 63.96-32.16 139.35H60.39Z" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-white text-base font-bold leading-tight">
                        Organize Fundraisers
                      </h2>
                      <p className="text-[#93adc8] text-sm font-normal leading-normal">
                        Hosting fundraising events and giving financial support
                        aid immediate relief and long-term recovery for
                        disaster-affected communities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

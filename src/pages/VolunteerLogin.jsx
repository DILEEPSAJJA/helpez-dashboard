import React, { useState } from "react";
import DefaultHeader from "../components/Header/DefaultHeader";

export default function VolunteerLogin() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    // e.preventDefault();
    // try {
    //   const querySnapshot = await db
    //     .collection("MemberSignup")
    //     .where("phoneNumber", "==", phoneNumber)
    //     .where("password", "==", password)
    //     .get();
    //   if (!querySnapshot.empty) {
    //     const user = querySnapshot.docs[0].data();
    //     alert("Logged in");
    //   } else {
    //     alert("Invalid phone number or password");
    //   }
    // } catch (error) {
    //   return console.log(error);
    // }
  };
  return (
    <>
      <div className="flex min-h-screen flex-col bg-[#111a22]">
        <DefaultHeader />
        <div className="flex flex-col items-center justify-center flex-1 w-full p-4">
          <div className="bg-[#1a2632] p-8 rounded-lg shadow-2xl max-w-lg w-full">
            <div className="mb-6 text-center">
              <h1 className="text-white text-3xl font-bold mb-4">
                Login as Volunteer
              </h1>
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label className="block text-white text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address "
                  onChange={(e) => setMail(e.target.value)}
                  className="w-full p-4 border border-[#344d65] bg-[#1a2632] rounded-lg text-white placeholder-[#93adc8] focus:outline-none focus:ring-2 focus:ring-[#344d65] shadow-sm"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-white text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 border border-[#344d65] bg-[#1a2632] rounded-lg text-white placeholder-[#93adc8] focus:outline-none focus:ring-2 focus:ring-[#344d65] shadow-sm"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button className="bg-[#1980e6] text-white px-24 py-3 rounded-lg font-bold hover:bg-[#146abf] transition duration-300 ease-in-out shadow-lg transform hover:scale-105">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import DefaultHeader from "../../components/Header/DefaultHeader";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/users";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const db = getFirestore(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user && user.isAdmin) {
      navigate("/admin/dashboard");
    }
  }, []);
  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const q = query(
        collection(db, "admins"),
        where("email", "==", email),
        where("password", "==", password)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        toast.success("Login Successful!!");
        const user = querySnapshot.docs[0].data();
        user.password = null;
        user.isAdmin = true;
        user.isVolunteer = false;
        dispatch(setUser(user));
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid email or password..");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col bg-[#111a22]">
        <DefaultHeader />
        <div className="flex flex-col items-center justify-center flex-1 w-full p-4">
          <div className="bg-[#1a2632] p-8 rounded-lg shadow-2xl max-w-lg w-full">
            <div className="mb-6 text-center">
              <h1 className="text-white text-3xl font-bold mb-4">
                Admin Login
              </h1>
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label className="block text-white text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your Email Address"
                  onChange={(e) => setEmail(e.target.value)}
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
                <button
                  disabled={loading}
                  className="bg-[#1980e6] text-white px-24 py-3 rounded-lg font-bold hover:bg-[#146abf] transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
                >
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
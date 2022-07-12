import { signOut } from "firebase/auth";
import React from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../firebasedata/firebase-config";
import { toast } from "react-toastify";

const Header = () => {
  const handleSignOut = () => {
    signOut(auth);
    toast.done("Dang xuat thanh cong");
  };
  return (
    <div>
      <header className="flex items-center justify-center py-10 mb-10 text-white header gap-x-5">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          Movies
        </NavLink>
        <NavLink
          to="/sign-up"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          SignUp
        </NavLink>
        <NavLink
          to="/sign-in"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          SignIn
        </NavLink>

        <button onClick={handleSignOut}>Sign Out</button>
      </header>
    </div>
  );
};

export default Header;

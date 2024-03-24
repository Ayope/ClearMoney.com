import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import api from "@/utils/api";

export default function LogoutButton() {
  const { resetUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async() => {
    await api("POST", "api/auth/logout");
    resetUser();
    navigate("/login");
  };

  return (
    <button
      type="button"
      className="focus:outline-none text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

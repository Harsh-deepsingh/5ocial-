import React from "react";
import { signOut } from "next-auth/react";

const Logout = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "https://blindlysocial.com/signin" });
  };

  return (
    <div>
      <div className="flex flex-col gap-7 items-center justify-center mt-3">
        <p>Logout from your account</p>
        <button
          className="bg-red-600 px-2.5 py-1.5 rounded-sm w-1/4"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;

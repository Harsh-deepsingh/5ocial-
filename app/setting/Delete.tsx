import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Delete = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const router = useRouter();

  const handleDeleteAccount = async () => {
    try {
      //await axios.delete(`/api/user/${userId}`);
      await signOut({ callbackUrl: "/signin" });
      alert("Your account has been deleted.");
      router.push("/signin");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      {!confirmDelete ? (
        <>
          <p className="text-lg font-bold text-red-600">
            Are you sure you want to delete your account?
          </p>
          <p className="text-sm text-gray-400">
            This action cannot be undone. All your data will be permanently
            deleted.
          </p>
          <button
            onClick={() => setConfirmDelete(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-sm hover:bg-red-700 transition-all"
          >
            Yes, delete my account
          </button>
        </>
      ) : (
        <>
          <p className="text-lg font-bold text-red-600">
            Please confirm deletion
          </p>
          <p className="text-sm text-gray-400">
            Type &quot;DELETE&quot; in the box below to confirm.
          </p>
          <input
            type="text"
            className="border-2 border-theme-border bg-transparent p-2 rounded-sm text-center focus:outline-none"
            placeholder="Type: DELETE"
            onChange={(e) =>
              e.target.value === "DELETE" ? handleDeleteAccount() : null
            }
          />
          <button
            onClick={() => setConfirmDelete(false)}
            className="text-gray-500 hover:underline"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
};

export default Delete;

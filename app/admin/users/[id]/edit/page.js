"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import UserForm from "../../../components/UserForm";
import { Loader2 } from "lucide-react";

export default function EditUserPage() {
  const params = useParams();
  const id = params.id;
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/v1/users/${id}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        // Assuming API returns { data: { ...user } }
        setUserData(data.data || data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        <p className="text-slate-500 font-medium">Loading user profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-red-700 font-bold text-lg mb-2">Error Loading User</p>
        <p className="text-red-600 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="rounded-xl bg-red-600 px-6 py-2 text-sm font-bold text-white shadow-lg hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <UserForm mode="edit" initialData={userData} />
    </div>
  );
}

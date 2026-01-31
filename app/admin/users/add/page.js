"use client";

import UserForm from "../../components/UserForm";

export default function AddUserPage() {
  return (
    <div className="py-8">
      <UserForm mode="add" />
    </div>
  );
}

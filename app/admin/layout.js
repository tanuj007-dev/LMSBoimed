import AdminShell from "./components/AdminShell";

export const metadata = {
  title: "Blog Admin Panel",
  description: "Manage blogs, categories, users, and settings",
};

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}

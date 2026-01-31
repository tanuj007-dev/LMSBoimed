"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const isAdminRoute = pathname?.startsWith("/admin");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by ensuring consistent initial render
  if (!mounted) {
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    );
  }

  if (isAdminRoute) {
    // Admin routes: no navbar/footer
    return <>{children}</>;
  }

  // Regular routes: include navbar and footer
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

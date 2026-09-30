"use client";

import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";
import Landing from "@/components/Landing";

export { default as AuthGate } from "@/components/AuthGate";

export default function TodoApp() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        Loading your workspace…
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {isAuthenticated ? <Dashboard /> : <Landing />}
    </>
  );
}
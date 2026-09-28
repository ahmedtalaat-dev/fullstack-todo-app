import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Check, LogOut } from "lucide-react";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-950"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Check size={17} strokeWidth={2.5} />
          </span>
          TodoApp
        </Link>

        {isAuthenticated ? (
          <button onClick={logout} className="button-ghost">
            <LogOut size={16} /> Sign out
          </button>
        ) : (
          <nav className="flex items-center gap-2">
            <Link href="/login" className="button-ghost">
              Log in
            </Link>

            <Link href="/register" className="button-primary">
              Sign up
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

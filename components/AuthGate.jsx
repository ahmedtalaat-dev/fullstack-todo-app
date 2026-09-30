"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, User, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AuthGate({ mode }) {
  const { login, register } = useAuth();
  const [form, setForm] = useState(
    mode === "login"
      ? { email: "", password: "" }
      : { name: "", email: "", password: "" },
  );
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (Object.values(form).some((value) => !value.trim()))
      return setError("Please complete all fields.");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters.");
    setBusy(true);
    try {
      await (mode === "login" ? login(form) : register(form));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const isLogin = mode === "login";

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <User size={22} />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-slate-500">
            {isLogin
              ? "Log in to pick up where you left off."
              : "A calmer way to organize your day."}
          </p>
        </div>
        <form
          onSubmit={submit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8"
        >
          {!isLogin && (
            <label className="field">
              <span>Full name</span>
              <div className="input-wrap">
                <User size={17} />
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ahmed Talaat"
                />
              </div>
            </label>
          )}

          <label className="field mt-2">
            <span>Email address</span>
            <div className="input-wrap">
              <Mail size={17} />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="ahmed@gmail.com"
              />
            </div>
          </label>

          <label className="field mt-2">
            <span>Password</span>
            <div className="input-wrap">
              <Lock size={17} />
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="At least 6 characters"
              />
            </div>
          </label>

          {error && (
            <div
              role="alert"
              className="mb-4 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700 mt-2"
            >
              {error}
            </div>
          )}
          <button
            disabled={busy}
            className="button-primary w-full justify-center py-3 mt-2"
          >
            {busy ? "Please wait…" : isLogin ? "Log in" : "Create account"}
          </button>
          <p className="mt-6 text-center text-sm text-slate-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              className="font-medium text-blue-600 hover:text-blue-700"
              href={isLogin ? "/register" : "/login"}
            >
              {isLogin ? "Sign up" : "Log in"}
            </Link>
          </p>
        </form>
      </motion.div>
    </main>
  );
}

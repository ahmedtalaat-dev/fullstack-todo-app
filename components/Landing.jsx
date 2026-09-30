"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";

export default function Landing() {
  return (
    <main className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="eyebrow">
            <span className="size-1.5 rounded-full bg-blue-600" />
            Simple task management
          </div>
          <h1 className="mt-6 max-w-2xl text-5xl font-semibold leading-[1.05] tracking-[-.04em] text-slate-950 sm:text-6xl lg:text-7xl">
            Organize your day.
            <br />
            <span className="text-blue-600">Get things done.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-500">
            Keep your tasks organized and stay focused on what matters. TodoApp
            gives your day a little more clarity.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/register"
              className="button-primary justify-center px-6 py-3.5"
            >
              Get started <ChevronRight size={17} />
            </Link>
            <Link
              href="/login"
              className="text-center text-sm font-medium text-slate-500 hover:text-slate-950"
            >
              Already have an account?{" "}
              <span className="text-blue-600">Log in</span>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -inset-10 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-blue-100/60 sm:p-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-blue-600">
                  Tuesday, September 26
                </p>
                <h2 className="mt-1 text-xl font-semibold text-slate-950">
                  Today&apos;s focus
                </h2>
              </div>
              <div className="flex size-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Check size={19} />
              </div>
            </div>
            {[
              ["Review project brief", "completed"],
              ["Write weekly update", "in-progress"],
              ["Plan tomorrow", "pending"],
            ].map(([title, status], i) => (
              <div
                key={title}
                className="flex items-center gap-3 border-t border-slate-100 py-4"
              >
                <div
                  className={`flex size-5 items-center justify-center rounded-full ${status === "completed" ? "bg-blue-600 text-white" : "border-2 border-slate-200"}`}
                >
                  {status === "completed" && <Check size={12} />}
                </div>
                <span
                  className={`text-sm ${status === "completed" ? "text-slate-400 line-through" : "text-slate-700"}`}
                >
                  {title}
                </span>
                <span className="ml-auto text-[11px] text-slate-400">
                  {i === 0 ? "Done" : i === 1 ? "In progress" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}

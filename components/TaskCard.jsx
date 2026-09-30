"use client";

import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { statusMeta } from "./constant/tasks";

export default function TaskCard({ task, onEdit, onDelete }) {
  const [label, Icon] = statusMeta[task.status] || statusMeta.pending;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg hover:shadow-slate-200/50"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-slate-950">
            {task.title}
          </h3>
          <p className="mt-2 min-h-10 line-clamp-2 text-sm leading-5 text-slate-500">
            {task.description || "No description added."}
          </p>
        </div>
        <span className={`status status-${task.status}`}>
          <Icon size={14} />
          {label}
        </span>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs text-slate-400">
          {new Date(task.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <div className="flex gap-1">
          <button
            className="icon-button text-slate-500 hover:bg-blue-50 hover:text-blue-600"
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
          >
            <Pencil size={16} />
          </button>
          <button
            className="icon-button text-slate-500 hover:bg-red-50 hover:text-red-600"
            onClick={() => onDelete(task)}
            aria-label={`Delete ${task.title}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({
  title = "Delete item",
  message = "Are you sure you want to perform this action?",
  confirmLabel = "Delete",
  onConfirm,
  onClose,
  busy = false,
}) {
  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
        >
          <div className="flex items-start justify-between">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <AlertTriangle size={22} />
            </div>
            <button
              className="icon-button"
              onClick={onClose}
              aria-label="Close"
              disabled={busy}
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {message}
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              className="button-secondary flex-1 justify-center"
              onClick={onClose}
              disabled={busy}
            >
              Cancel
            </button>
            <button
              type="button"
              className="button-primary flex-1 justify-center bg-red-600 hover:bg-red-700"
              onClick={onConfirm}
              disabled={busy}
            >
              {busy ? "Deleting…" : confirmLabel}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

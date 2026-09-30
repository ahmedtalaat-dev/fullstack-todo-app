"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ListTodo, Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { deleteTask, getTasks } from "@/lib/tasks";
import { PAGE_SIZE } from "./constant/tasks";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import ConfirmModal from "./ConfirmModal";
import Pagination from "./Pagination";

export default function Dashboard() {
  const { user, token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    getTasks(token)
      .then((data) => setTasks(data.tasks || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  const totalPages = Math.max(1, Math.ceil(tasks.length / PAGE_SIZE));
  const visible = useMemo(
    () => tasks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [tasks, page],
  );

  function saved(task) {
    setTasks((current) =>
      modal
        ? modal._id
          ? current.map((item) => (item._id === task._id ? task : item))
          : [task, ...current]
        : current,
    );
    setModal(null);
    setNotice(modal ? "Task updated." : "Task created.");
    setPage(1);
    setTimeout(() => setNotice(""), 3000);
  }

  // Triggers custom delete modal
  function remove(task) {
    setTaskToDelete(task);
  }

  // Performs actual async deletion after modal confirmation
  async function handleDeleteConfirm() {
    if (!taskToDelete) return;
    setDeleting(true);
    try {
      await deleteTask(token, taskToDelete._id);
      const next = tasks.filter((item) => item._id !== taskToDelete._id);
      setTasks(next);
      setPage(Math.min(page, Math.max(1, Math.ceil(next.length / PAGE_SIZE))));
      setNotice("Task deleted.");
      setTimeout(() => setNotice(""), 3000);
      setTaskToDelete(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      {/* Workspace Header */}
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-blue-600">
            Your workspace
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Welcome back, {user?.name?.split(" ")[0] || "there"}
          </h1>
          <p className="mt-2 text-slate-500">
            Here&apos;s what&apos;s on your plate today.
          </p>
        </div>
        <button
          className="button-primary w-full justify-center sm:w-auto"
          onClick={() => setModal("new")}
        >
          <Plus size={17} /> Add task
        </button>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <ListTodo size={19} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-950">All tasks</p>
          <p className="text-xs text-slate-500">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"} in your list
          </p>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-2xl bg-slate-100"
            />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <CheckCircle2 size={23} />
          </div>
          <h2 className="font-semibold text-slate-950">No tasks yet</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
            Create your first task and start getting things done.
          </p>
          <button
            className="button-primary mx-auto mt-6"
            onClick={() => setModal("new")}
          >
            <Plus size={16} /> Add task
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={setModal}
                onDelete={remove}
              />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </>
      )}

      {notice && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-medium text-white shadow-xl"
        >
          {notice}
        </motion.div>
      )}

      {/* Edit / Create Task Modal */}
      {modal && (
        <TaskModal
          task={modal === "new" ? null : modal}
          onClose={() => setModal(null)}
          onSaved={saved}
        />
      )}

      {/* Delete Confirmation Custom Modal */}
      {taskToDelete && (
        <ConfirmModal
          title="Delete task?"
          message={`Are you sure you want to permanently delete "${taskToDelete.title}"? This action cannot be undone.`}
          confirmLabel="Delete task"
          busy={deleting}
          onConfirm={handleDeleteConfirm}
          onClose={() => setTaskToDelete(null)}
        />
      )}
    </main>
  );
}

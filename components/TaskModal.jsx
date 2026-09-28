import { useAuth } from "@/context/AuthContext";

export default function TaskModal({ task, onClose, onSaved }) {
  const { token } = useAuth();
  const [form, setForm] = useState(
    task
      ? {
          title: task.title,
          description: task.description || "",
          status: task.status,
        }
      : initialForm,
  );

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    if (!form.title.trim()) return setError("Give your task a title.");
    setBusy(true);
    try {
      const result = task
        ? await updateTask(token, task._id, form)
        : await createTask(token, form);
      onSaved(result.task);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
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
          aria-labelledby="task-title"
          className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
        >
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2
                id="task-title"
                className="text-xl font-semibold text-slate-950"
              >
                {task ? "Edit task" : "Add a new task"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {task
                  ? "Make a quick update to your task."
                  : "Capture what needs to get done."}
              </p>
            </div>

            <button
              className="icon-button"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={submit} className="flex flex-col gap-4">
            <label className="field">
              <span>Title</span>
              <input
                className="input"
                autoFocus
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Prepare project brief"
              />
            </label>
            <label className="field">
              <span>
                Description <em>(optional)</em>
              </span>
              <textarea
                className="input min-h-24 resize-y"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Add a little context…"
              />
            </label>
            <label className="field">
              <span>Status</span>
              <select
                className="input"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In progress</option>
                <option value="completed">Completed</option>
              </select>
            </label>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="mt-2 flex gap-3">
              <button
                type="button"
                className="button-secondary flex-1 justify-center"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                disabled={busy}
                className="button-primary flex-1 justify-center"
              >
                {busy ? "Saving…" : task ? "Save changes" : "Add task"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

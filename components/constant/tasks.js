import { CheckCircle2, Circle, Clock3 } from "lucide-react";

export const PAGE_SIZE = 6;

export const initialForm = {
  title: "",
  description: "",
  status: "pending",
};

export const statusMeta = {
  pending: ["Pending", Clock3],
  "in-progress": ["In progress", Circle],
  completed: ["Completed", CheckCircle2],
};
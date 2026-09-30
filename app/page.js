import TodoApp from "@/components/TodoApp";
import { AuthProvider } from "@/context/AuthContext";

export default function Page() {
  return (
    <AuthProvider>
      <TodoApp />
    </AuthProvider>
  );
}

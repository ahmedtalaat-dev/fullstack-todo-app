import { AuthProvider } from "@/context/AuthContext";
import { AuthGate } from "@/components/TodoApp";

export default function RegisterPage() {
  return (
    <AuthProvider>
      <AuthGate mode="register" />
    </AuthProvider>
  );
}

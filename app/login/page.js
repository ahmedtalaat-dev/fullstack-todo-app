import { AuthProvider } from "@/context/AuthContext";
import { AuthGate } from "@/components/TodoApp";

export default function LoginPage() {
  return (
    <AuthProvider>
      <AuthGate mode="login" />
    </AuthProvider>
  );
}

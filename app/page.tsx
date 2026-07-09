import AuthGuard from "@/components/auth/AuthGuard";
import ExpenseTracker from "@/components/ExpenseTracker";

export default function Home() {
  return (
    <AuthGuard>
      <ExpenseTracker />
    </AuthGuard>
  );
}

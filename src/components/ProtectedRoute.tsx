import type { JSX } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../stores/authStore.js";

export function ProtectedRoute(): JSX.Element {
  const token = useAuthStore((state) => state.token);

  if (token === null) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIsLoggedIn } from "../features/auth/authSelector";

interface Props {
  children: ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;

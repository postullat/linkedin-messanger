import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { children } = props;

  useEffect(() => {
    chrome.storage.local.get("token", (result) => {
      if (!result.token) {
        navigate("/no-access");
      }
    });
  }, [navigate]);

  return children;
};

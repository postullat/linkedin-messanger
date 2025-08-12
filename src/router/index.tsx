import { ChatPage } from "@/pages/chat";
import { Home } from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { NoAccessPage } from "@/pages/NoAccess.page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/index.html",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/chat/:entityUrn",
    element: (
      <ProtectedRoute>
        <ChatPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/no-access",
    element: (
      <ProtectedRoute>
        <NoAccessPage />
      </ProtectedRoute>
    ),
  },
]);

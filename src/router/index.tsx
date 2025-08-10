import { ChatPage } from "@/pages/chat";
import { Home } from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/index.html",
    element: <Home />,
  },
  {
    path: "/chat/:entityUrn",
    element: <ChatPage />,
  },
]);

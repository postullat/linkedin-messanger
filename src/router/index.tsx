import { Chat } from "@/pages/Chat";
import { Home } from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/index.html",
      element: <Home />,
    },
    {
      path: "/chat/:id",
      element: <Chat />,
    },
  ],
  {
    basename: "/",
  }
);

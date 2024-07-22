import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import "@/styles/globals.css";
import DebatePage from "@/pages/debate.tsx";
import ConfigurationPage from "@/pages/configuration.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/debate",
          element: <DebatePage />,
        },
        {
          path: "configuration",
          element: <ConfigurationPage />,
        },
      ],
    },
  ],
  { basename: "/DebateTimer" },
);

window.global = globalThis;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

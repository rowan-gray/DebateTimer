import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
    createBrowserRouter, RouterProvider,
} from "react-router-dom";
import ConfigurationPage from "./components/ConfigurationPage.tsx";
import DebatePage from "./components/DebatePage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
              path: "/debate",
              element: <DebatePage/>
            },
            {
                path: "configuration",
                element: <ConfigurationPage/>,
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)

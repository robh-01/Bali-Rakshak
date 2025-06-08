import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppContainer from "./AppContainer.jsx";
import App from "./App.jsx";
import Diagnose from "./Components/Diagnose/Diagnose.jsx";
import AskAi from "./Components/AskAi/AskAi.jsx";
import LoginPage from "./Components/LoginPage/LoginPage.jsx";
import SignUpPage from "./Components/SignUpPage/SignUpPage.jsx";
import RedirectionPage from "./Components/RedirectionPage/RedirectionPage.jsx";
import HomePage from "./Components/HomePage/HomePage.jsx";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <HomePage/>
  },
  {
    path: "/",
    element: <AppContainer />,
    children: [
      {
        index: true,
        // This is the default route that will render the Diagnose component
        element: <RedirectionPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
       {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "app",
        // This is the main app route that will render the App component
        element: <App />,
        children: [
          {
            index: true,
            element: <Diagnose />,
          },
          {
            path: "ask",
            element: <AskAi />,
          },
          {
            path: "community",
            element: <div>Community Page</div>,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

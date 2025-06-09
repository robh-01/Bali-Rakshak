import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Diagnose from "./Components/Diagnose/Diagnose.jsx";
import AskAi from "./Components/AskAi/AskAi.jsx";
import LoginPage from "./Components/LoginPage/LoginPage.jsx";
import SignUpPage from "./Components/SignUpPage/SignUpPage.jsx";
import HomePage from "./Components/HomePage/HomePage.jsx";
import CommunityPage from "./Components/CommunityPage/CommunityPage.jsx";
import CreatePost from "./Components/CreatePost/CreatePost.jsx";
import CommunityPagePosts from "./Components/CommunityPagePosts/CommunityPagePosts.jsx";

const router = createBrowserRouter([
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
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
        element: <CommunityPage />,
        children: [
          {
            index: true,
            element: <CommunityPagePosts />,
          },
          {
            path: "post/:postId",
            element: <div>post will be visible here</div>,
          },
          {
            path: "new",
            element: <CreatePost/>,
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

import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
import WritePage from "./pages/WritePage";
import NotFoundPage from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "login", Component: LoginPage },
      { path: "posts", Component: PostListPage },
      { path: "posts/:postId", Component: PostDetailPage },
      {
        Component: ProtectedRoute,
        children: [
          { path: "write", Component: WritePage },
        ],
      },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

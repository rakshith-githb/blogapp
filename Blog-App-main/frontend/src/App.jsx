import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateArticle from "./pages/CreateArticle";
import EditArticle from "./pages/EditArticle";
import ArticleDetails from "./pages/ArticleDetails";
import AdminDashboard from "./pages/AdminDashboard";
import MyArticles from "./pages/MyArticles";
import MyComments from "./pages/MyComments";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute roles={["author"]}>
              <CreateArticle />
            </ProtectedRoute>
          }
        />
        <Route path="/article/:id" element={<ArticleDetails />} />
        <Route
          path="/my-articles"
          element={
            <ProtectedRoute roles={["author", "admin"]}>
              <MyArticles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-comments"
          element={
            <ProtectedRoute roles={["user", "author", "admin"]}>
              <MyComments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-article/:id"
          element={
            <ProtectedRoute roles={["author"]}>
              <EditArticle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        </Routes>
      </BrowserRouter>
    );
  }

export default App;

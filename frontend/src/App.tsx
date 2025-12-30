import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

// Layout
import Layout from "./components/layout/Layout";

// Auth Components
import AdminRoute from "./components/auth/AdminRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import AdminDashboard from "./components/page/admin/AdminDashboard";
import Home from "./components/page/home/Home";
import Login from "./components/page/login/Login";
import UserProfile from "./components/page/profile/UserProfile";
import Signup from "./components/page/signup/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

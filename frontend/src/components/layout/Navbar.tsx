import { clearAccessToken, getAccessToken } from "@/store/authStore";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!getAccessToken();

  const handleLogout = () => {
    clearAccessToken();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Purple Merit
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                >
                  Profile
                </Link>
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                >
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

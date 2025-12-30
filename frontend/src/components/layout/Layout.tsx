import AuthBootstrap from "@/provide/AuthBootstrap";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <AuthBootstrap>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
      </div>
    </AuthBootstrap>
  );
}

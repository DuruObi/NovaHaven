import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import History from "./pages/History";
import MagicTech from "./pages/MagicTech";
import Characters from "./pages/Characters";
import ComicBook from "./pages/ComicBook";
import Forum from "./pages/Forum";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/AdminDashboard";
import { Analytics } from "@vercel/analytics/react";

const App: React.FC = () => {
  return (
    <Router>
      <Analytics />
      <Navbar />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/magic-tech" element={<MagicTech />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/comic-book" element={<ComicBook />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Forum Route */}
        <Route
          path="/forum"
          element={
            <ProtectedRoute>
              <Forum />
            </ProtectedRoute>
          }
        />

        {/* Optional Fallback Route */}
        <Route
          path="*"
          element={
            <main className="page">
              <h2>404 - Page Not Found</h2>
              <p>The page you are looking for does not exist in NovaHaven.</p>
            </main>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;

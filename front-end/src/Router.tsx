import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import HomePage from './pages/HomePage/HomePage';
import ComprarPage from './pages/ComprarPage/ComprarPage';
import VenderPage from './pages/VenderPage/VenderPage';
import PortfolioPage from './pages/PortfolioPage/PortfolioPage';
import Navbar from './components/Navbar/Navbar';

const HIDDEN_NAVBAR_PATHS = ['/login', '/register', '/'];

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/comprar" element={<ComprarPage />} />
      <Route path="/vender" element={<VenderPage />} />
      <Route path="/minhas-acoes" element={<PortfolioPage />} />
    </Routes>
  );
}

export function Router() {
  const location = useLocation();
  const showNavbar = !HIDDEN_NAVBAR_PATHS.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <AppRoutes />
    </>
  );
}

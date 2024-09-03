import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import HomePage from './pages/HomePage/HomePage';
import ComprarPage from './pages/ComprarPage/ComprarPage';
import Navbar from './components/Navbar/Navbar';
import VenderPage from './pages/VenderPage/VenderPage';

const AppRoutes = () => {
  const location = useLocation();

  // Condiciona a renderização da Navbar com base no caminho atual
  const showNavbar = !['/login', '/register', '/'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/comprar" element={<ComprarPage />} />
        <Route path="/vender" element={<VenderPage />} />
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redireciona para a página de login por padrão */}
        {/* Adiciona uma rota padrão para páginas não encontradas */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;

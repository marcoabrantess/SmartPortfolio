import LoginPage from './pages/LoginPage/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage/RegisterPage';


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/" element={<LoginPage />} />
        </Routes>
    </Router>
  );
}

export default App;

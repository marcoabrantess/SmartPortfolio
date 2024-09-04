// src/components/Navbar/Layout.jsx
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaHome, FaUserCircle } from 'react-icons/fa';
import authService from '../../services/AuthService';
import { UserAmountContext } from '../../context/UserAmountContext';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    
    const { userAmount } = useContext(UserAmountContext);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    useEffect(() => {
        const name = authService.getUser();
        setUserName(name);
    }, []);

    const goHome = () => {
        navigate('/home');
    };

    return (
        <div className="layout">
            <nav className="navbar">
                <ul className="nav-links">
                    <li>
                        <Link to="/minhas-acoes">Minha Carteira</Link>
                    </li>
                    <li>
                        <Link to="/comprar">Comprar</Link>
                    </li>
                    <li>
                        <Link to="/vender">Vender</Link>
                    </li>
                </ul>
                <div className="navbar-end">
                    <button onClick={goHome} className="home-button">
                        <FaHome size={24} color="white" />
                    </button>
                    <div className="user-icon" onClick={toggleDropdown}>
                        <FaUserCircle size={30} color="white" />
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <p>{userName}</p>
                                <p>Saldo: R${userAmount}</p>
                                <Link to="/minhas-acoes">Minhas Ações</Link>
                                <button onClick={handleLogout} className="logout-button">Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;

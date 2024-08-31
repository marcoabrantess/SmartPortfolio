// src/components/Navbar/Layout.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaHome, FaUserCircle } from 'react-icons/fa';
import authService from '../../services/AuthService';
import acoesService from '../../services/AcoesService';

const Navbar = ({ children }) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [carteira, setTotalCarteira] = useState();
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        authService.logout(); // Chama a função de logout
        navigate('/login'); // Redireciona o usuário para a página de login
    };

    useEffect(() => {
        const name = authService.getUser(); // Obtém o nome do usuário
        //const cartUser = acoesService.getTotalCarteira();

        setUserName(name);
        //setTotalCarteira(cartUser);
    }, []);

    const goHome = () => {
        navigate('/home');
    };

    return (
        <div className="layout">
            <nav className="navbar">
                <ul className="nav-links">
                    <li>
                        <Link to="/minhas-acoes">Minhas Ações</Link>
                    </li>
                    <li>
                        <Link to="/filtrar">Filtrar</Link>
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
                                <p>Saldo: R${carteira}</p>
                                <Link to="/minhas-acoes">Minhas Ações</Link>
                                <Link to="/extrato">Extrato</Link>
                                <button onClick={handleLogout} className="logout-button">Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
                    <div className="content">
                        {children}
                    </div>
                </div>
        );
    }

    export default Navbar;

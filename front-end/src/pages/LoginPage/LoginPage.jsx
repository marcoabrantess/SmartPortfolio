import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Link } from 'react-router-dom';


const LoginPage = () => {
    return (
        <div className="login-page">
            <div className="login-container">
                <LoginForm />
                <div className="register-button-container">
                    <Link to="/register" className="register-link">
                        Não tem uma conta? Registre-se!
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
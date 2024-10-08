import { useNavigate } from 'react-router-dom';
import authService from '../../services/AuthService';
import './LoginForm.css';
import  { useState } from 'react';

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [sucessMessage, setsucessMessage] = useState('');    
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await authService.login(login, password);
            setErrorMessage('')
            setsucessMessage('Login bem sucedido! Redirecionando para a página inicial...');
            setTimeout(() => {
                navigate('/home');
            }, 2000); 

        } catch (error) {
            setErrorMessage('Erro na autenticação. Verifique suas credenciais.');
        }
    };


    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="login">Login:</label>
                    <input
                        type="login"
                        id="login"
                        name="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">Entrar</button>
            </form>
            {sucessMessage && <p className="success-message">{sucessMessage}</p>}
        </div>
    );
};

export default LoginForm;

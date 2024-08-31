import { useNavigate } from 'react-router-dom';
import authService from '../../services/AuthService';
import './RegisterForm.css';
import  { useState } from 'react';

const RegisterButton = () => {
    const [name, setName] = useState('');
    const [CPF, setCPF] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Estado para controle de carregamento

    const navigate = useNavigate(); 
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');
        setLoading(true); // Ativa o estado de carregamento

        try {
            var result = await authService.registerUser(name, CPF, login, password);
            if(result.success){
                setMessage('Registro bem-sucedido! Você pode agora fazer login.');
                setTimeout(() => {
                    setLoading(false); 
                    navigate('/login');
                }, 2000); 
            }
            else{
                setError('Erro ao registrar. Por favor, tente novamente.');
                setLoading(false); 
        }
        } catch (error) {
            setError('Erro ao registrar. Por favor, tente novamente.');
            setLoading(false); 
        }
    };

    return (
        <div className="register-form">
            <h2>Registrar</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="CPF">CPF</label>
                    <input
                        type="CPF"
                        id="CPF"
                        value={CPF}
                        onChange={(e) => setCPF(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Login</label>
                    <input
                        type="login"
                        id="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>Registrar</button>
            </form>
            {loading && <div className="loading-spinner">  Carregando...</div>} {/* Exibe o símbolo de carregamento */}
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default RegisterButton;

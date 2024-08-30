// src/components/PasswordRecovery.js
import React, { useState } from 'react';
import authService from '../../services/AuthService';
import './PasswordRecovery.css';


const PasswordRecovery = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setError('');

        try {
            await authService.sendPasswordResetEmail(email);
            setMessage('Instruções para redefinir a senha foram enviadas para o e-mail fornecido.');
        } catch (error) {
            setError('Erro ao enviar o e-mail de recuperação. Por favor, tente novamente.');
        }
    };

    return (
        <div className="password-recovery">
            <h2>Recuperar Senha</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Enviar e-mail de recuperação</button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default PasswordRecovery;
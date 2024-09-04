// src/pages/ExibirAcoesPage/ExibirAcoesPage.jsx
import { useEffect, useState } from 'react';
import './PortfolioPage.css'; // Corrigido para o nome correto do arquivo CSS
import acoesService from '../../services/AcoesService';
import authService from '../../services/AuthService';

function PortfolioPage() {
    const [acoes, setAcoes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchAcoes() {
            setLoading(true);
            const loggedUser = authService.getUserId();
            try {
                const response = await acoesService.getAcoesByUserId(loggedUser);
                setAcoes(response.assets || []);
            } catch (error) {
                setError("Erro ao carregar ações.");
                console.error('Erro ao carregar ações:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchAcoes();
    }, []);

    const getCardClassName = (acao) => {
        const rendimento = (acao.currentValue - acao.price) / 100;
        if (rendimento > 0) return "card positive";
        if (rendimento < 0) return "card negative";
        return "card neutral";
    };

    const getRendimentoIcon = (acao) => {
        const rendimento = (acao.currentValue - acao.price) / acao.price * 100;
        if (rendimento > 0) return "▲";
        if (rendimento < 0) return "▼";
        return "=";
    };

    return (
        <div className="exibir-page">
            <br />
            <h1>Ações Disponíveis</h1>
            {loading && <div className="spinner"></div>}
            {error && <div className="error-message">{error}</div>}
            <div className="cards-container">
                {acoes.map((acao, index) => (
                    <div className={getCardClassName(acao)} key={index}>
                        <h2>{acao.name}</h2>
                        <p>Código: {acao.code}</p>
                        <p>Quantidade: {acao.quantity}</p>
                        <p>Preço Médio: R$ {acao.currentValue}</p>
                        <p>Preço Atual: R$ {acao.price}</p>
                        <p>Rendimento: {((acao.currentValue - acao.price) / 100).toFixed(2)} % <b>{getRendimentoIcon(acao)}</b></p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PortfolioPage;

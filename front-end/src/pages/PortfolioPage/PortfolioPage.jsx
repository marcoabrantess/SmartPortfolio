// src/pages/PortfolioPage/PortfolioPage.jsx

import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './PortfolioPage.css'; // Corrigido para o nome correto do arquivo CSS
import acoesService from '../../services/AcoesService';
import authService from '../../services/AuthService';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

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

    const chartData = {
        labels: acoes.map(acao => acao.name),
        datasets: [
            {
                data: acoes.map(acao => acao.quantity),
                backgroundColor: acoes.map(() => `hsl(${Math.random() * 360}, 70%, 70%)`), // Cores aleatórias
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="exibir-page">
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
            {acoes.length > 0 && (
                <div className="chart-container">
                    <h2>Distribuição das Ações</h2>
                    <Pie data={chartData} />
                </div>
            )}
        </div>
    );
}

export default PortfolioPage;

// src/pages/PortfolioPage/PortfolioPage.jsx

import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './PortfolioPage.css';
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

    const calculateRendimento = (acao) => {
        return ((acao.currentValue - acao.price) / acao.price) * 100; // Cálculo correto do rendimento
    };

    const getCardClassName = (acao) => {
        const rendimento = calculateRendimento(acao);
        if (rendimento > 0) return "card positive";
        if (rendimento < 0) return "card negative";
        return "card neutral";
    };

    const getRendimentoIcon = (acao) => {
        const rendimento = calculateRendimento(acao);
        if (rendimento > 0) return "▲";
        if (rendimento < 0) return "▼";
        return "=";
    };

    const chartData = {
        labels: acoes.map(acao => acao.name),
        datasets: [
            {
                data: acoes.map(acao => acao.quantity),
                backgroundColor: acoes.map(() => `hsl(${Math.random() * 360}, 70%, 70%)`),
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
            {acoes.length === 0 ? (
                <div className="no-actions-message">Você não possui ações disponíveis.</div>
            ) : (
                <>
                    <div className="cards-container">
                        {acoes.map((acao, index) => (
                            <div className={getCardClassName(acao)} key={index}>
                                <h2>{acao.name}</h2>
                                <p>Código: {acao.code}</p>
                                <p>Quantidade: {acao.quantity}</p>
                                <p>Preço Médio: R$ {acao.price}</p> {/* Corrigido para usar o preço médio correto */}
                                <p>Preço Atual: R$ {acao.currentValue}</p> {/* Corrigido para usar o preço atual correto */}
                                <p>Rendimento: {calculateRendimento(acao).toFixed(2)} % <b>{getRendimentoIcon(acao)}</b></p> {/* Usar cálculo correto aqui */}
                            </div>
                        ))}
                    </div>
                    <div className="chart-container">
                        <h2>Distribuição das Ações</h2>
                        <Pie data={chartData} />
                    </div>
                </>
            )}
        </div>
    );
}

export default PortfolioPage;

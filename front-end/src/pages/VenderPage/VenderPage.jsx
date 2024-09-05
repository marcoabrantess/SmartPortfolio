// src/pages/VenderPage/VenderPage.jsx

import { useEffect, useState, useContext } from 'react';
import './VenderPage.css';
import acoesService from '../../services/AcoesService';
import authService from '../../services/AuthService';
import { UserAmountContext } from '../../context/UserAmountContext';

function VenderPage() {
    const [acoes, setAcoes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAcao, setSelectedAcao] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [refreshTrigger, setRefreshTrigger] = useState(false); // Adicionado para controle de atualização

    const { setUserAmount } = useContext(UserAmountContext);

    useEffect(() => {
        const loggedUser = authService.getUserId();
        async function fetchAcoes() {
            setLoading(true);
            try {
                const response = await acoesService.getAcoesByUserId(loggedUser);
                setAcoes(response.assets || []);
            } catch (error) {
                console.error('Erro ao carregar ações:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchAcoes();
    }, [refreshTrigger]); // Dependência do refreshTrigger

    const handleSell = (acao) => {
        setSelectedAcao(acao);
        setModalOpen(true);
        setError("");
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedAcao(null);
        setQuantity(1);
        setLoading(false);
        setSuccess(false);
        setError("");
    };

    const handleSelling = async () => {
        if (!selectedAcao) return;
        if (quantity > selectedAcao.quantity) {
            setError("Quantidade excede o disponível.");
            return;
        }
        try {
            const userId = authService.getUserId();
            const price = selectedAcao.price;
            const assetId = selectedAcao.id;
            const result = await acoesService.venderAcao(price, assetId, quantity, userId);

            if (result.success) {
                // Atualiza a quantidade da ação localmente
                selectedAcao.quantity -= quantity;
                if (selectedAcao.quantity === 0) {
                    // Se a quantidade se tornar zero, remove a ação da lista
                    setTimeout(() => {
                        setAcoes(prevAcoes => prevAcoes.filter(acao => acao.id !== selectedAcao.id));
                    }, 2000);
                } else {
                    // Atualiza o estado com a ação modificada
                    setAcoes(prevAcoes => [...prevAcoes]);
                }

                // Atualiza o saldo do usuário
                setUserAmount(prevAmount => prevAmount + price * quantity);

                setLoading(false);
                setSuccess(true);
                setTimeout(() => {
                    closeModal();
                }, 2000);

            }
        } catch (error) {
            setLoading(false);
            setError("Erro ao tentar realizar a venda.");
        }
    };

    return (
        <div className="venda-page">
            <br/>
            <h1>Suas ações disponíveis</h1>
            {loading && <div className="spinner"></div>}
            {acoes.length === 0 ? (
                <div className="no-actions-message">Você não possui ações disponíveis para vender.</div>
            ) : (
                <>
                    <div className="cards-container">
                        {acoes.map((acao, index) => (
                            <div className="card" key={index}>
                                <h2>{acao.name}</h2>
                                <p>Valor R$: {acao.price}</p>
                                <p>Nome: {acao.name} </p>
                                <p>Quantidade: {acao.quantity}</p>
                                <button 
                                    className="buy-button" 
                                    onClick={() => handleSell(acao)}
                                >
                                    Vender
                                </button>
                            </div>
                        ))}
                    </div>
                    {modalOpen && selectedAcao && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <button className="modal-close-button" onClick={closeModal}>×</button>
                                <h2>Vender {selectedAcao.symbol}</h2>
                                <p>Valor unitário: R${selectedAcao.price.toFixed(2)}</p>
                                <input 
                                    type="number" 
                                    value={quantity} 
                                    onChange={(e) => setQuantity(Number(e.target.value))} 
                                    min="1"
                                    placeholder="Quantidade" 
                                />
                                 <button onClick={handleSelling} className="modal-button" disabled={loading}>
                                    {loading ? "Carregando..." : "Confirmar"}
                                </button>
                                <button onClick={closeModal} className="modal-button cancel-button" disabled={loading}>
                                    Cancelar
                                </button>
                                {loading && <div className="spinner"></div>}
                                {success && <div className="success-message">Venda realizada com sucesso!</div>}
                                {error && <div className="error-message">{error}</div>}
                            </div>
                        </div>
                    )}
                </>
            )}
            <br/>
        </div>
    );
}

export default VenderPage;

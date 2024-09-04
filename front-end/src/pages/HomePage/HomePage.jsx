import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { FaDollarSign, FaPlus, FaFilter } from 'react-icons/fa'; // Ícones adicionados
import DepositoService from '../../services/DepositoService';
import InvestService from '../../services/InvestService';
import authService from '../../services/AuthService';
import { UserAmountContext } from '../../context/UserAmountContext';

function HomePage() {
    const [modalOpen, setModalOpen] = useState(false); // Estado para o modal
    const [depositAmount, setDepositAmount] = useState(0); // Valor do depósito
    const [totalInvested, setTotalInvested] = useState(0);
    const { userAmount, setUserAmount } = useContext(UserAmountContext); // Obtém o userAmount do contexto
    const [portfolioValue, setPortfolioValue] = useState(0);

    // Função para abrir o modal
    const openModal = () => {
        setModalOpen(true);
    };

    // Função para fechar o modal
    const closeModal = () => {
        setModalOpen(false);
        setDepositAmount(''); // Limpa o valor do depósito ao fechar
    };

    // Função para realizar o depósito
    const handleDeposit = async () => {
        try {
            const userId = authService.getUserId();
            await DepositoService.depositar(depositAmount, userId);

            // Adiciona um atraso de 500ms antes de buscar o valor atualizado
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const updatedAmount = await InvestService.getUserAmount(userId); // Obtém o valor atualizado
            closeModal(); 
            setUserAmount(updatedAmount.amount || 0); // Atualiza o userAmount no contexto
            
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const loggedUser = authService.getUserId();
        
        async function getTotalInvested() {
            const response = await InvestService.getTotal(loggedUser);
            setTotalInvested(response.totalInvested || 0);
        }

        function updatePortfolioValue() {
            setPortfolioValue(totalInvested + userAmount);
            
        }
        
        getTotalInvested();
        updatePortfolioValue();
    }, [totalInvested, userAmount]);

    return (
        <div className="homepage">
            <div className="content">
                <div className="investimento-container">
                    <div className="total-investido-container">
                        <h2 className="total-investido-title">Valor Total Investido</h2>
                        <p className="total-investido-value">R${totalInvested.toFixed(2)}</p>
                    </div>
                    <div className="carteira-container">
                        <h2 className="carteira-title">Valor da Carteira</h2>
                        <p className="carteira-value">R${portfolioValue.toFixed(2)}</p>
                    </div>
                </div>
                <div className="actions-container">
                    <Link to="/comprar" className="action-button">
                        <FaDollarSign size={24} />
                        <span>Comprar</span>
                    </Link>
                    <button onClick={openModal} className="action-button deposit-button">
                        <FaPlus size={24} />
                        <span>Depositar</span>
                    </button>
                    <Link to="/filtrar" className="action-button">
                        <FaFilter size={24} />
                        <span>Filtrar</span>
                    </Link>
                </div>
                {modalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button className="modal-close-button" onClick={closeModal}>×</button>
                            <h2>Depositar Valor</h2>
                            <input 
                                type="number" 
                                value={depositAmount} 
                                onChange={(e) => setDepositAmount(e.target.value)} 
                                placeholder="Digite o valor" 
                            />
                            <button onClick={handleDeposit} className="modal-button">Confirmar</button>
                            <button onClick={closeModal} className="modal-button cancel-button">Cancelar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;

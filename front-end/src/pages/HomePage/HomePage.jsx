import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { FaDollarSign, FaPlus, FaFilter } from 'react-icons/fa'; // Ícones adicionados
import DepositoService from '../../services/DepositoService';
import InvestService from '../../services/InvestService';
import authService from '../../services/AuthService';


function HomePage() {
    const [modalOpen, setModalOpen] = useState(false); // Estado para o modal
    const [depositAmount, setDepositAmount] = useState(0); // Valor do depósito
    const [totalInvested, setTotalInvested] = useState(0);
    const [portfolioValue, setPortfolioValue] = useState(0);

    // Calcula o valor total investido
    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setDepositAmount(''); // Limpa o valor do depósito ao fechar
    };

    const handleDeposit = async () => {
        try{
            const userId = authService.getUserId();
            await DepositoService.depositar(depositAmount, userId);
            closeModal(); 
        }
        catch(error){
           console.log(error);
        }
    };

    useEffect(() => {
        const loggedUser = authService.getUserId();
        async function fetchTotalInvested() {
            const response = await InvestService.getTotal(loggedUser);
            setTotalInvested(response.totalInvested || 0);
        }

        function getTotalAmount() {
            const availableBalance = parseFloat(localStorage.getItem('available_balance'))
            
            if(totalInvested) {
                setPortfolioValue(totalInvested + availableBalance)
            }
        }
        
        fetchTotalInvested();
        getTotalAmount();
    }, [totalInvested, depositAmount])

  
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
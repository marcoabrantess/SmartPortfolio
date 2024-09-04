import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { FaDollarSign, FaPlus } from 'react-icons/fa';
import DepositoService from '../../services/DepositoService';
import InvestService from '../../services/InvestService';
import authService from '../../services/AuthService';
import { UserAmountContext } from '../../context/UserAmountContext';

function HomePage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [depositAmount, setDepositAmount] = useState(0);
    const [totalInvested, setTotalInvested] = useState(0);
    const { userAmount, setUserAmount } = useContext(UserAmountContext);
    const [portfolioValue, setPortfolioValue] = useState(0);
    const [loading, setLoading] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
        setDepositAmount(0);
    };

    const handleDeposit = async () => {
        try {
            setLoading(true);
            const userId = authService.getUserId();
            await DepositoService.depositar(depositAmount, userId);
            await new Promise(resolve => setTimeout(resolve, 500));
            const updatedAmount = await InvestService.getUserAmount(userId);
            closeModal();
            setUserAmount(updatedAmount.amount || 0);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loggedUser = authService.getUserId();
        
        const fetchData = async () => {
            setLoading(true);
            const response = await InvestService.getTotal(loggedUser);
            setTotalInvested(response.totalInvested || 0);
            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        setPortfolioValue(totalInvested + userAmount);
    }, [totalInvested, userAmount]);

    if (loading) {
        return <div className="spinner"></div>;
    }

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
                    <button onClick={openModal} className="deposit-button">
                        <FaPlus size={24} />
                        <span>Depositar</span>
                    </button>
                </div>
                {modalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button className="modal-close-button" onClick={closeModal}>×</button>
                            <h2>Depositar Valor</h2>
                            <input 
                                type="number" 
                                value={depositAmount} 
                                onChange={(e) => setDepositAmount(Number(e.target.value))} 
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

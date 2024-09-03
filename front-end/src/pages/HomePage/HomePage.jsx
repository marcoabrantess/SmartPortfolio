import { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { FaDollarSign, FaPlus, FaFilter } from 'react-icons/fa'; // Ícones adicionados
import DepositoService from '../../services/DepositoService';
import authService from '../../services/AuthService';


function HomePage() {
    const [modalOpen, setModalOpen] = useState(false); // Estado para o modal
    const [depositAmount, setDepositAmount] = useState(''); // Valor do depósito
  
    // Calcula o valor total investido
    const totalInvestido = 1500.00; // Exemplo, substitua pelo valor real
    const valorCarteira = 1200.00; // Exemplo, substitua pelo valor real
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

  
    return (
        <div className="homepage">
            <div className="content">
                <div className="investimento-container">
                    <div className="total-investido-container">
                        <h2 className="total-investido-title">Valor Total Investido</h2>
                        <p className="total-investido-value">R${totalInvestido}</p>
                    </div>
                    <div className="carteira-container">
                        <h2 className="carteira-title">Valor da Carteira</h2>
                        <p className="carteira-value">R${valorCarteira.toFixed(2)}</p>
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
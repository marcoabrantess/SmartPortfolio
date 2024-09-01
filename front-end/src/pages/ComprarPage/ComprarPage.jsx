import { useEffect, useState } from 'react';
import './ComprarPage.css';
import acoesService from '../../services/AcoesService';

function ComprarPage() {
    const [acoes, setAcoes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAcao, setSelectedAcao] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        async function fetchAcoes() {
            const response = await acoesService.getAcoes();

            // Ajuste o código para acessar o array correto
            setAcoes(response.acoes || []);
        }
        
        fetchAcoes();
    }, []);

    const handleBuy = (acao) => {
        setSelectedAcao(acao);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedAcao(null);
        setQuantity(1);
    };

    const handlePurchase = async () => {
        if (!selectedAcao) return;

        try {
            await acoesService.comprarAcao(selectedAcao, quantity);
            console.log(`Compra realizada: ${selectedAcao.nome}, Quantidade: ${quantity}`);
            closeModal();
        } catch (error) {
            console.error('Erro ao comprar ação:', error);
            setError('Erro ao realizar a compra. Tente novamente.');
        }
    };

    return (
        <div className="compra-page">
            <h1>Disponíveis para compra</h1>
            <div className="cards-container">
                {acoes.map((acao, index) => (
                    <div className="card" key={index}>
                        <h2>{acao.nome}</h2>
                        <p>Valor R$: {acao.price}</p>
                        <p>Nome: {acao.name} </p>
                        <p>Código: {acao.symbol}</p>
                        <button 
                            className="buy-button" 
                            onClick={() => handleBuy(acao)}
                        >
                            Comprar
                        </button>
                    </div>
                ))}
            </div>
            {modalOpen && selectedAcao && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close-button" onClick={closeModal}>×</button>
                        <h2>Comprar {selectedAcao.nome}</h2>
                        <p>Valor unitário: R${selectedAcao.currentValue.toFixed(2)}</p>
                        <input 
                            type="number" 
                            value={quantity} 
                            onChange={(e) => setQuantity(Number(e.target.value))} 
                            min="1"
                            placeholder="Quantidade" 
                        />
                        <button onClick={handlePurchase} className="modal-button">Confirmar</button>
                        <button onClick={closeModal} className="modal-button cancel-button">Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ComprarPage;

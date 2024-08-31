import { useEffect, useState } from 'react';
import './ComprarPage.css';
import Acao from '../../models/Acao';

const acoesMock = [
    { nome: 'Ação 1', valor: 150.00, quantidade: 1 },
    { nome: 'Ação 2', valor: 200.00, quantidade: 15 },
    { nome: 'Ação 3', valor: 250.00, quantidade: 23 },
    { nome: 'Ação 4', valor: 300.00, quantidade: 30 },
    { nome: 'Ação 5', valor: 350.00, quantidade: 5 },
    { nome: 'Ação 6', valor: 400.00, quantidade: 12 },
    { nome: 'Ação 7', valor: 450.00, quantidade: 8 },
    { nome: 'Ação 8', valor: 500.00, quantidade: 20 }
];

function ComprarPage() {
    const [acoes, setAcoes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAcao, setSelectedAcao] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const acoes = acoesMock.map(acao => new Acao(
            acao.nome,
            '', // code
            acao.valor,
            '', // type
            '', // name
            0,  // averagePurchagePrice
            acao.quantidade,  // quantity
            []  // transactions
        ));
        setAcoes(acoes);
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

    const handlePurchase = () => {
        console.log(`Compra realizada: ${selectedAcao.nome}, Quantidade: ${quantity}`);
        closeModal();
    };

    return (
        <div className="compra-page">
            <h1>Disponíveis para compra</h1>
            <div className="cards-container">
                {acoes.map((acao, index) => (
                    <div className="card" key={index}>
                        <h2>{acao.nome}</h2>
                        <p>Valor R$: {acao.currentValue.toFixed(2)}</p>
                        <p>Quantidade: {acao.quantity}</p>
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

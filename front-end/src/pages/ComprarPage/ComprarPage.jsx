import { useEffect, useState } from 'react';
import './ComprarPage.css';
import acoesService from '../../services/AcoesService';
import authService from '../../services/AuthService';

function ComprarPage() {
    const [acoes, setAcoes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAcao, setSelectedAcao] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false); // Estado para controlar o spinner
    const [success, setSuccess] = useState(false); // Estado para controlar o ícone de sucesso

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
        // handlePurchase(acao);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedAcao(null);
        setQuantity(1);
        setLoading(false); // Reseta o spinner ao fechar o modal
        setSuccess(false); // Reseta o ícone de sucesso ao fechar o modal
    };

    const handlePurchase = async () => {
        console.log(selectedAcao)
        if (!selectedAcao) return;

       try{
            const userId = authService.getUser();
            const result = acoesService.comprarAcao(selectedAcao, quantity, userId);

            if(result.success){
                setLoading(false); // Para o spinner
                setSuccess(true); // Mostra o ícone de sucesso
                setTimeout(() => {
                    closeModal(); // Fecha o modal após o intervalo
                }, 2000); // Intervalo de 2 segundos
            }
        }
        catch(error){
            console.error('Erro ao comprar ação:', error);
        }
    };

    return (
        <div className="compra-page">
            <h1>Disponíveis para compra</h1>
            <div className="cards-container">
                {acoes.map((acao, index) => (
                    <div className="card" key={index}>
                        <h2>{acao.name}</h2>
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
                        <h2>Comprar {selectedAcao.symbol}</h2>
                        <p>Valor unitário: R${selectedAcao.price.toFixed(2)}</p>
                        <input 
                            type="number" 
                            value={quantity} 
                            onChange={(e) => setQuantity(Number(e.target.value))} 
                            min="1"
                            placeholder="Quantidade" 
                        />
                         <button onClick={handlePurchase} className="modal-button" disabled={loading}>
                            {loading ? "Carregando..." : "Confirmar"} {/* Botão desabilitado durante o carregamento */}
                        </button>
                        <button onClick={closeModal} className="modal-button cancel-button" disabled={loading}>
                            Cancelar
                        </button>
                        {loading && <div className="spinner"></div>} {/* Exibe o spinner durante o carregamento */}
                        {success && <div className="success-icon">✔</div>} {/* Exibe o ícone de sucesso após a compra */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ComprarPage;

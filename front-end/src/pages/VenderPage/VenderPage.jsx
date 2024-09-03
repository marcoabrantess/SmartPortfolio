import { useEffect, useState } from 'react';
import './VenderPage.css';
import acoesService from '../../services/AcoesService';
import authService from '../../services/AuthService';

function VenderPage() {
    const [acoes, setAcoes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAcao, setSelectedAcao] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false); // Estado para controlar o spinner
    const [success, setSuccess] = useState(false); // Estado para controlar o ícone de sucesso
    const [error, setError] = useState(""); // Estado para controlar a mensagem de erro


    useEffect(() => {
        const loggedUser = authService.getUserId();
        async function fetchAcoes() {
            const response = await acoesService.getAcoesByUserId(loggedUser);

            setAcoes(response.assets || []);
        }
        
        fetchAcoes();
    }, []);

    const handleSell = (acao) => {
        setSelectedAcao(acao);
        setModalOpen(true);
        setError(""); // Limpa a mensagem de erro ao abrir o modal
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedAcao(null);
        setQuantity(1);
        setLoading(false); // Reseta o spinner ao fechar o modal
        setSuccess(false); // Reseta o ícone de sucesso ao fechar o modal
        setError(""); // Limpa a mensagem de erro ao abrir o modal

    };

    const handleSelling = async () => {
        console.log(selectedAcao)
        if (!selectedAcao) return;

        if (quantity > selectedAcao.quantity) {
            setError("Quantidade excede o disponível.");
            return;
        }
        
       try{
            const userId = authService.getUserId();
            const price = selectedAcao.price;
            const assetId = selectedAcao.id;
            const result = await acoesService.venderAcao(price, assetId, quantity, userId);

            if(result.success){
                selectedAcao.quantity -= quantity;
                setAcoes(selectedAcao => [...selectedAcao]);
                setLoading(false); // Para o spinner
                setSuccess(true); // Mostra o ícone de sucesso
                setTimeout(() => {
                    closeModal(); // Fecha o modal após o intervalo
                }, 2000); // Intervalo de 2 segundos
            }
        }
        catch(error){
            setLoading(false); // Para o spinner em caso de exceção
            setError("Erro ao tentar realizar a venda.");
        }
    };

    return (
        <div className="compra-page">
            <h1>Suas ações disponíveis</h1>
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
                            {loading ? "Carregando..." : "Confirmar"} {/* Botão desabilitado durante o carregamento */}
                        </button>
                        <button onClick={closeModal} className="modal-button cancel-button" disabled={loading}>
                            Cancelar
                        </button>
                        {loading && <div className="spinner"></div>} {/* Exibe o spinner durante o carregamento */}
                        {success && <div className="success-message">Venda realizada com sucesso!</div>} {/* Exibe a mensagem de sucesso */}
                        {error && <div className="error-message">{error}</div>} {/* Exibe a mensagem de erro, se houver */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default VenderPage;

import { useEffect, useState, useContext } from 'react';
import './ComprarPage.css';
import acoesService from '../../services/AcoesService';
import authService from '../../services/AuthService';
import { UserAmountContext } from '../../context/UserAmountContext';

function ComprarPage() {
    const [acoes, setAcoes] = useState([]);
    const [filteredAcoes, setFilteredAcoes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAcao, setSelectedAcao] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false); // Estado para controlar o spinner
    const [success, setSuccess] = useState(false); // Estado para controlar o ícone de sucesso
    const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca

    const { setUserAmount } = useContext(UserAmountContext);

    useEffect(() => {
        async function fetchAcoes() {
            setLoading(true);
            try {
                    const response = await acoesService.getAcoes();
                    setAcoes(response.acoes || []);
                    setFilteredAcoes(response.acoes || []);
            } catch (error) {
                console.error('Erro ao carregar ações:', error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchAcoes();
    }, []);

    useEffect(() => {
        // Filtra as ações conforme o termo de busca
        setFilteredAcoes(
            acoes.filter(acao =>
                acao.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, acoes]);

    const handleBuy = (acao) => {
        setSelectedAcao(acao);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedAcao(null);
        setQuantity(1);
        setLoading(false); // Reseta o spinner ao fechar o modal
        setSuccess(false); // Reseta o ícone de sucesso ao fechar o modal
    };

    const handlePurchase = async () => {
        if (!selectedAcao) return;

        try {
            const userId = authService.getUserId();
            const result = await acoesService.comprarAcao(selectedAcao, quantity, userId);

            if (result.success) {
                setLoading(false); // Para o spinner
                setSuccess(true); // Mostra o ícone de sucesso

                // Atualiza o saldo do usuário
                const price = selectedAcao.price;
                setUserAmount(prevAmount => prevAmount - (price * quantity));

                setTimeout(() => {
                    closeModal(); // Fecha o modal após o intervalo
                }, 2000); // Intervalo de 2 segundos
            }
        } catch (error) {
            console.error('Erro ao comprar ação:', error);
        }
    };

    return (
        <div className="compra-page">
            <br/>
            <h1>Disponíveis para compra</h1>
            <input
                type="text"
                className="search-bar"
                placeholder="Buscar por nome"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            {loading && <div className="spinner"></div>}
                <div className="cards-container">
                    {filteredAcoes.map((acao, index) => (
                        <div className="card" key={index}>
                            <h2>{acao.name}</h2>
                            <p>Valor R$: {acao.price}</p>
                            <p>Nome: {acao.name}</p>
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
                            {loading ? "Carregando..." : "Confirmar"}
                        </button>
                        <button onClick={closeModal} className="modal-button cancel-button" disabled={loading}>
                            Cancelar
                        </button>
                        {loading && <div className="spinner"></div>}
                        {success && <div className="success-message">Compra realizada com sucesso!</div>}
                    </div>
                </div>
            )}
            <br/>
        </div>
    );
}

export default ComprarPage;

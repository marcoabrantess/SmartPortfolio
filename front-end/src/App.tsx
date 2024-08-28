import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Acao {
  preco: number;
  nome: string;
}

const App: React.FC = () => {
  const [acoes, setAcao] = useState<Acao[] | null>(null); // Correção do tipo de estado

  useEffect(() => {
    async function fetchStockPrice() {
      try {
        const response = await axios.get('http://localhost:5000/api/stock-price');
        setAcao(response.data.acoes);
      } catch (error) {
        console.error('Erro ao buscar dados das ações:', error);
      }
    }

    fetchStockPrice();
  }, []);

  return (
    <div>
      <h1>Preço das Ações</h1>
      {acoes ? (
        <ul>
          {acoes.map((acao) => (
            <li key={acao.nome}>
              Simbolo: {acao.nome} - Preço: {acao.preco.toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default App;

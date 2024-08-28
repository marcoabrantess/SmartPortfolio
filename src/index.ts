import express from 'express';
import cors from 'cors';
import yahooFinance from 'yahoo-finance2';

const app = express();
const PORT = 5000;
const SYMBOLS = ['IBM', 'AAPL', 'GOOGL', 'MSFT']; // Exemplo de símbolos válidos

interface Acao {
  preco: number;
  nome: string;
}

app.use(cors());

app.get('/api/stock-price', async (req, res) => {
  try {
    // Usa Promise.all para buscar todos os dados das ações
    const acoes = await Promise.all(SYMBOLS.map(async (symbol) => {
      try {
        const stock = await yahooFinance.quote(symbol);
        const price = stock.regularMarketPrice;
        if (price === undefined) {
          console.log('Preço não encontrado para ' + symbol);
          return null; // Retorna null para símbolos com preço não encontrado
        }
        return { preco: price, nome: symbol }; // Retorna o objeto com preço e nome
      } catch (error) {
        console.error('Erro ao buscar dados para ' + symbol + ':', error);
        return null; // Retorna null em caso de erro
      }
    }));

    // Filtra os valores null e garante que apenas objetos do tipo Acao sejam retornados
    const acoesFiltradas: Acao[] = acoes.filter((acao): acao is Acao => acao !== null);

    res.json({ acoes: acoesFiltradas });
  } catch (error) {
    console.error('Erro ao buscar preços das ações:', error);
    res.status(500).json({ error: 'Erro ao buscar preços das ações' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

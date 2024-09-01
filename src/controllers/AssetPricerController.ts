import { Request, Response } from 'express';
import yahooFinance from 'yahoo-finance2';

const SYMBOLS = ['IBM', 'AAPL', 'GOOGL', 'MSFT']; // Exemplo de símbolos válidos

interface Acao {
    price: number;
    name: string;
    symbol: string;
}

export class AssetPricerController {
  async handle(req: Request, res: Response) {
    try {
      // Usa Promise.all para buscar todos os dados das ações
      const acoes = await Promise.all(SYMBOLS.map(async (symbol) => {
        try {
            const stock = await yahooFinance.quote(symbol);
            const price = stock.regularMarketPrice;
            const name = stock.shortName || symbol; // Usa o nome curto se disponível

            if (price === undefined) {
                console.log('Preço não encontrado para ' + symbol);
                return null; // Retorna null para símbolos com preço não encontrado
            }

            return { price, name, symbol }; // Retorna o objeto com preço, nome e código
        } catch (error) {
            console.error('Erro ao buscar dados para ' + symbol + ':', error);
            return null; // Retorna null em caso de erro
        }
      }));

      // Filtra os valores null e garante que apenas objetos do tipo Acao sejam retornados
      const acoesFiltradas: Acao[] = acoes.filter((acao): acao is Acao => acao !== null);

      return res.status(201).json({ success: true, message: 'User created successfully!', acoes: acoesFiltradas });
    } catch (error) {
      console.error('Erro ao buscar preços das ações:', error);
      res.status(500).json({ error: 'Erro ao buscar preços das ações' });
    }
  }
}

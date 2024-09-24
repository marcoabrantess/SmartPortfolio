import yahooFinance from 'yahoo-finance2';

interface Acao {
    price: number;
    name: string;
    symbol: string;
}

export class GetAssetPricesService {
    private symbols: string[];

    constructor(symbols: string[]) {
        this.symbols = symbols;
    }

    // Busca o preço e o nome de todas as ações
    async getAllAssetPrices(): Promise<Acao[]> {
        const acoes = await Promise.all(this.symbols.map(async (symbol) => {
            try {
                const stock = await yahooFinance.quote(symbol);
                const price = stock.regularMarketPrice;
                const name = stock.shortName || symbol;

                if (price === undefined) {
                    console.log('Preço não encontrado para ' + symbol);
                    return null;
                }

                return { price, name, symbol };
            } catch (error) {
                console.error('Erro ao buscar dados para ' + symbol + ':', error);
                return null;
            }
        }));

        return acoes.filter((acao): acao is Acao => acao !== null);
    }

    // Busca o preço e o nome de uma ação específica pelo símbolo
    async getAssetPriceBySymbol(symbol: string): Promise<number | null> {
        try {
            const stock = await yahooFinance.quote(symbol);
            const price = stock.regularMarketPrice;

            if (price === undefined) {
                console.log('Preço não encontrado para ' + symbol);
                return null;
            }

            return price;
        } catch (error) {
            console.error('Erro ao buscar dados para ' + symbol + ':', error);
            return null;
        }
    }
}

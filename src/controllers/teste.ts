import { AppDataSource } from '../data-source'; // Ajuste o caminho conforme necessário
import { User } from '../models/User'; // Ajuste o caminho conforme necessário
import { GetAssetPricesService } from '../services/GetAssetPricesService'; // Ajuste o caminho conforme necessário

const SYMBOLS = ['IBM', 'AAPL', 'GOOGL', 'MSFT']; // Exemplo de símbolos válidos
const getAssetPricesService = new GetAssetPricesService(SYMBOLS);

const initialize = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");
    } catch (error) {
        console.error("Error initializing Data Source:", error);
    }
};

const getTotalInvestedValueForUser = async (userId: string) => {
    try {
        await initialize(); // Certifique-se de que o DataSource está inicializado

        const userRepository = AppDataSource.getRepository(User);

        // Carregar o usuário com a relação do portfólio
        const user = await userRepository.findOne({
            where: { id: userId },
            relations: ['portfolio', 'portfolio.assets'] // Certifique-se de carregar as relações necessárias
        });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Calcular o total investido
        const totalInvested = await user.portfolio?.assets.reduce(async (totalPromise, asset) => {
            const total = await totalPromise;
            const price = await getAssetPricesService.getAssetPriceBySymbol(asset.code);

            if (price !== null) {
                return total + price * asset.quantity;
            } else {
                return total; // Se o preço não estiver disponível, não adiciona nada
            }
        }, Promise.resolve(0)) || 0;

        console.log(`Valor total investido pelo usuário ${userId}: R$${totalInvested.toFixed(2)}`);
    } catch (error) {
        console.error('Erro ao obter valor total investido:', error);
    }
};

// Substitua pelo ID do usuário que você deseja testar
const userId = "a7d12031-5e54-46e6-b7ea-b1964b4335ba";
getTotalInvestedValueForUser(userId);

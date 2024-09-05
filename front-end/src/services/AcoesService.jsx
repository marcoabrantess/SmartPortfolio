import acoesRepository from '../repositories/AcoesRepository';

const acoesService = {
  getAcoes: async () => {
    try {
      const acoes = await acoesRepository.getAcoes();
      return acoes;
    } catch (error) {
      console.error('Erro no acoesService:', error);
      throw error;
    }
  },

  comprarAcao: async (asset, quantity, userId) => {
    try {
      const result = await acoesRepository.comprarAcao(asset, quantity, userId);
      return result;
    } catch (error) {
      throw error;
    }
  },

  venderAcao: async (price, assetId, quantity, userId) => {
    try {
      const result = await acoesRepository.venderAcao(price, assetId, quantity, userId);
      return result;
    } catch (error) {
      console.error('Erro no acoesService:', error);
      throw error;
    }
  },

  getTotalCarteira: async () => {
    try {
      const totalCarteira = await acoesRepository.getTotalCarteira();
      return totalCarteira;
    }
    catch (error) {
      console.error('Erro no acoesService:', error);
      throw error;
    }
  },

  getAcoesByUserId: async (userId) => {
    try{
      const response = await acoesRepository.getAcoesByUserId(userId);
      return response;
    }
    catch(error){
      console.error('Erro no acoesService:', error);
      throw error
    }
  }
}

export default acoesService;
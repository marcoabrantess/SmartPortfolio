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

  comprarAcao: async (acao, quantity, userId) => {
    try {
      const result = await acoesRepository.comprarAcao(acao, quantity, userId);
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
}

export default acoesService;
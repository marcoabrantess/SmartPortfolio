// src/repositories/acoesRepository.js
import axios from 'axios';

const acoesRepository = {
  getAcoes: async () => {
    try {
      const response = await axios.get('/api/acoes', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Pega o token do localStorage
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro no acoesRepository:', error);
      throw error;
    }
  },

  getTotalCarteira: async () => {
    try {
      const response = await axios.get('/api/acoes/totalCarteira', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Pega o token do localStorage
        },
      });
      return response.data;
    }
    catch (error) {
      console.error('Erro no acoesRepository:', error);
      throw error;
    }
  }
};

export default acoesRepository;

// src/repositories/acoesRepository.js
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const acoesRepository = {
  getAcoes: async () => {
    try {
      // {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Pega o token do localStorage
      //   },
      // }
      const response = await fetch(`${API_BASE_URL}/assets-price`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },        
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro no acoesRepository:', error);
      throw error;
    }
  },

  comprarAcao: async (asset, quantity, userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comprar-acao`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ asset, quantity, userId }),
      });
      if (!response.ok) {
          throw new Error('Erro na compra da ação');
      }
      return await response.json();
    } catch (error) {
        console.error('Erro ao comprar ação:', error);
        throw error;
    }
  },

  venderAcao: async (asset, quantity, userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/vender-acao`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ asset, quantity, userId }),
      });
      if (!response.ok) {
          throw new Error('Erro na venda da ação');
      }
      return await response.json();
    } catch (error) {
        console.error('Erro ao venda ação:', error);
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
  },

  getAcoesByUserId: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/minhas-acoes`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
          params: userId
      });
      return await response.json();
    }
    catch (error) {
      console.error('Erro no acoesRepository:', error);
      throw error;
    }
  }

};

export default acoesRepository;

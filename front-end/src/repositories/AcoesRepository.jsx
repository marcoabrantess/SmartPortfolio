const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const acoesRepository = {
  getAcoes: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/assets-price`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao carregar ações');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro no acoesRepository:', error);
      throw error; // Lançar o erro para que o front-end possa capturá-lo
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
        const errorData = await response.json(); // Tenta obter dados do erro
        throw new Error(errorData.error || 'Erro na compra da ação');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao comprar ação:', error);
      throw error; // Lançar o erro para que o front-end possa capturá-lo
    }
  },

  venderAcao: async (price, assetId, quantity, userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/vender-acao`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price, assetId, quantity, userId }),
      });

      if (!response.ok) {
        throw new Error('Erro na venda da ação');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao vender ação:', error);
      throw error; // Lançar o erro para que o front-end possa capturá-lo
    }
  },

  getAcoesByUserId: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/minhas-acoes/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        params: userId
      });

      if (!response.ok) {
        throw new Error('Erro ao carregar ações do usuário');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro no acoesRepository:', error);
      throw error; // Lançar o erro para que o front-end possa capturá-lo
    }
  }
};

export default acoesRepository;

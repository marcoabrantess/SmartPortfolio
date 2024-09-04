const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const InvestRepository = {
    getTotal: async (userId) => {
        try {
            //response será um model User
            const response = await fetch(`${API_BASE_URL}/obter-total-investido/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                params: userId
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar valor total:', error);
            throw error;
        }
    },

    getUserAmount: async (userId) => {
        try {
            //response será um model User
            const response = await fetch(`${API_BASE_URL}/obter-total-depositado/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                params: userId
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar valor total:', error);
            throw error;
        }
    }
};

export default InvestRepository;
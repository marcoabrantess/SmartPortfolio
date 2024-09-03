const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const InvestRepository = {
    getTotal: async (userId) => {
        try {
            //response será um model User
            const response = await fetch(`${API_BASE_URL}/obter-total-investido`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify({ userId }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao depositar:', error);
            throw error;
        }
    }
};

export default InvestRepository;
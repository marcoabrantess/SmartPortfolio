import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const DepositoRepository = {
    enviarValor: async (depositAmount, userId) => {
        try {
            //response será um model User
            const response = await fetch(`${API_BASE_URL}/depositar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify({ depositAmount, userId }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao depositar:', error);
            throw error;
        }
    }
};

export default DepositoRepository;
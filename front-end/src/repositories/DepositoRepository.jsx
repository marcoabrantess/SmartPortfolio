import axios from 'axios';

const DepositoRepository = {
    enviarValor: async (valor) => {
        try {
            const response = await axios.post('/api/deposito', { valor });
            return response.data;
        } catch (error) {
            throw new Error('Erro ao fazer o depósito');
        }
    }
};

export default DepositoRepository;
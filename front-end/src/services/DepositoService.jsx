import DepositoRepository from "../repositories/DepositoRepository";

const DepositoService = {
    depositar: async (amount) => {
        await DepositoRepository.enviarValor(amount);
    }
};

export default DepositoService;
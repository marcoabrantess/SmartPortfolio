import DepositoRepository from "../repositories/DepositoRepository";

const DepositoService = {
    depositar: async (depositAmount, userId) => {
        await DepositoRepository.enviarValor(depositAmount, userId);
    }
};

export default DepositoService;
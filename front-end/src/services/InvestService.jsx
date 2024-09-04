import InvestRepository from "../repositories/InvestRepository";

const InvestService = {
    getTotal: async (userId) => {
        return await InvestRepository.getTotal(userId);
    },

    getUserAmount: async (userId) => {
        return await InvestRepository.getUserAmount(userId);
    }
};

export default InvestService;
import InvestRepository from "../repositories/InvestRepository";

const InvestService = {
    getTotal: async (userId) => {
        return await InvestRepository.getTotal(userId);
    }
};

export default InvestService;
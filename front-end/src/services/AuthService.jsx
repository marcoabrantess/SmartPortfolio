import authRepository from "../repositories/AuthRepository";

const authService = {
    login: async (login, password) => {
        try {
            const data = await authRepository.authenticateUser(login, password);    

            const {token, user} = data;

            localStorage.setItem('access_token', token);
            localStorage.setItem('name', user.name);
            localStorage.setItem('userId', user.userId);
            
            return data.success;
        } catch (error) {
            console.error('Erro no authService:', error);
            throw error;
        }
    },

    getUser: () => {
        return localStorage.getItem('name');
    },

    getUserId: () => {
        return localStorage.getItem('userId');
    },

    logout: () => {
        localStorage.removeItem('access_token');
    },

    getAccessToken: () => {
        return localStorage.getItem('access_token');
    },

    // sendPasswordResetEmail: async (email) => {
    //     console.log(`Solicitação de recuperação de senha enviada para: ${email}`);
    //     return new Promise((resolve));
    // }

    registerUser: async (name, CPF, login, password) => {    
        try {
            return await authRepository.registerUser(name, CPF, login, password);
        } catch (error) {
            console.error('Erro no authService:', error);
            throw error;
        }
    }
};

export default authService;
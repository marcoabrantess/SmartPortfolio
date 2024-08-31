import authRepository from "../repositories/AuthRepository";

const authService = {
    login: async (login, password) => {
        try {
            const data = await authRepository.authenticateUser(login, password);    
            const {token, name} = data;

            localStorage.setItem('access_token', token);
            localStorage.setItem('user', name);
            
            return data.success;
        } catch (error) {
            console.error('Erro no authService:', error);
            throw error;
        }
    },

    getUser: () => {
        return localStorage.getItem('user');
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
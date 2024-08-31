const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const authRepository = {
    authenticateUser: async (email, password) => {
        try {
            //response será um model User
            const response = await fetch(`${API_BASE_URL}/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Erro na autenticação');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro no authRepository:', error);
            throw error;
        }
    },

    registerUser: async (name, CPF, login, password) => {    
        try {
             const response = await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, CPF, login, password }),
            });

            
            if (!response.ok) {
                throw new Error('Erro ao registrar');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro no authRepository:', error);
            throw error;
        }
    }
};

export default authRepository;

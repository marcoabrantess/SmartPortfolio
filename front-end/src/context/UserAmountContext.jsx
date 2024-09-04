// src/context/UserAmountContext.js
import { createContext, useState, useEffect } from 'react';
import InvestService from '../services/InvestService';
import authService from '../services/AuthService';

export const UserAmountContext = createContext();

export const UserAmountProvider = ({ children }) => {
    const [userAmount, setUserAmount] = useState(0);

    useEffect(() => {
        const fetchUserAmount = async () => {
            const loggedUser = authService.getUserId();
            const response = await InvestService.getUserAmount(loggedUser);
            setUserAmount(response.amount || 0);
        };

        fetchUserAmount();
    }, []);

    return (
        <UserAmountContext.Provider value={{ userAmount, setUserAmount }}>
            {children}
        </UserAmountContext.Provider>
    );
};

import { storage } from './storage';

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

export const authService = {
    register: async (userData) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        await new Promise(resolve => setTimeout(resolve, 500));

        const users = storage.get(USERS_KEY, []);

        if (users.find(u => u.email === userData.email)) {
            throw new Error('Email already exists');
        }

        const newUser = {
            id: Date.now().toString(),
            ...userData,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        storage.set(USERS_KEY, users);


        storage.set(CURRENT_USER_KEY, newUser);
        return newUser;
    },

    login: async (email, password) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const users = storage.get(USERS_KEY, []);
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            throw new Error('Invalid email or password');
        }

        storage.set(CURRENT_USER_KEY, user);
        return user;
    },

    logout: () => {
        storage.remove(CURRENT_USER_KEY);
    },

    getCurrentUser: () => {
        return storage.get(CURRENT_USER_KEY);
    },

    updateProfile: async (userId, updates) => {
        await new Promise(resolve => setTimeout(resolve, 300));

        const users = storage.get(USERS_KEY, []);
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) throw new Error('User not found');

        const updatedUser = { ...users[userIndex], ...updates };
        users[userIndex] = updatedUser;

        storage.set(USERS_KEY, users);


        const currentUser = storage.get(CURRENT_USER_KEY);
        if (currentUser && currentUser.id === userId) {
            storage.set(CURRENT_USER_KEY, updatedUser);
        }

        return updatedUser;
    }
};

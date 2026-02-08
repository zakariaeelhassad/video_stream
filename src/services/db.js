import { storage } from './storage';
import { INITIAL_VIDEOS, CATEGORIES } from './mockData';

const WATCHLIST_KEY = 'watchlist';
const HISTORY_KEY = 'history';

export const db = {
    getVideos: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Return mock videos. In a real app we might merge with local edits.
                resolve(INITIAL_VIDEOS);
            }, 300);
        });
    },

    getVideoById: async (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const video = INITIAL_VIDEOS.find(v => v.id === id);
                if (video) resolve(video);
                else reject(new Error('Video not found'));
            }, 200);
        });
    },

    getCategories: () => CATEGORIES,

    // Watchlist Operations
    getWatchlist: (userId) => {
        const list = storage.get(WATCHLIST_KEY, []);
        const userItems = list.filter(item => item.userId === userId);
        // Hydrate video data
        return userItems.map(item => ({
            ...item,
            video: INITIAL_VIDEOS.find(v => v.id === item.videoId)
        })).filter(item => item.video); // removing stale ids
    },

    addToWatchlist: async (userId, videoId) => {
        const list = storage.get(WATCHLIST_KEY, []);
        if (list.some(item => item.userId === userId && item.videoId === videoId)) {
            return; // Already added
        }
        const newItem = { id: Date.now(), userId, videoId, addedAt: new Date().toISOString() };
        list.push(newItem);
        storage.set(WATCHLIST_KEY, list);
        return newItem;
    },

    removeFromWatchlist: async (userId, videoId) => {
        let list = storage.get(WATCHLIST_KEY, []);
        list = list.filter(item => !(item.userId === userId && item.videoId === videoId));
        storage.set(WATCHLIST_KEY, list);
    },

    isInWatchlist: (userId, videoId) => {
        const list = storage.get(WATCHLIST_KEY, []);
        return list.some(item => item.userId === userId && item.videoId === videoId);
    },

    // History Operations
    addToHistory: (userId, videoId) => {
        const history = storage.get(HISTORY_KEY, []);

        const cleanHistory = history.filter(h => !(h.userId === userId && h.videoId === videoId));

        const newEntry = {
            id: Date.now(),
            userId,
            videoId,
            watchedAt: new Date().toISOString(),
        };


        cleanHistory.unshift(newEntry);
        storage.set(HISTORY_KEY, cleanHistory);
    },

    getHistory: (userId) => {
        const history = storage.get(HISTORY_KEY, []);
        return history
            .filter(h => h.userId === userId)
            .map(h => ({
                ...h,
                video: INITIAL_VIDEOS.find(v => v.id === h.videoId)
            }))
            .filter(h => h.video);
    }
};

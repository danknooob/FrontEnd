import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [{
            id: '1',
            name: 'Product 1',
            price: 10.0,
            imageUrl: 'https://via.placeholder.com/150',
            quantity: 1,
        },
        {
            id: '2',
            name: 'Product 2',
            price: 15.0,
            imageUrl: 'https://via.placeholder.com/150',
            quantity: 2,
        },
        {
            id: '3',
            name: 'Product 3',
            price: 20.0,
            imageUrl: 'https://via.placeholder.com/150',
            quantity: 1,
        },
    ],
    totalAmount: 10.0 + 15.0 * 2 + 20.0,
    favorites: [], // New state for favorites
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalAmount += newItem.price;
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({...newItem, quantity: 1 });
            }
        },
        subtractItem: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                state.totalAmount -= existingItem.price;
                if (existingItem.quantity === 1) {
                    state.items = state.items.filter(item => item.id !== id);
                } else {
                    existingItem.quantity--;
                }
            }
        },
        deleteItem: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                state.totalAmount -= existingItem.price * existingItem.quantity;
                state.items = state.items.filter(item => item.id !== id);
            }
        },
        addToFavorites: (state, action) => {
            const newItem = action.payload;
            state.favorites.push(newItem);
        },
        removeFromFavorites: (state, action) => {
            const id = action.payload;
            state.favorites = state.favorites.filter(item => item.id !== id);
        },
    },
});

export const { addItem, subtractItem, deleteItem, addToFavorites, removeFromFavorites } = cartSlice.actions;
export default cartSlice.reducer;
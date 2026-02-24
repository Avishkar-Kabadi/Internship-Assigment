import { createSlice } from "@reduxjs/toolkit";


const appSlice = createSlice({
    name: "app",
    initialState: {
        isLoggedIn: false,
        data: []
    },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.data = [];
        },
        setData(state, action) {
            state.data = action.payload;
        }

    }
});


export const { login, logout, setData } = appSlice.actions;
export default appSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("data")) || []

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {

        login(state, action) {
            return action.payload;
        },
        logout() {
            return [];
        },
    }
});


export const { login, logout } = appSlice.actions;
export default appSlice.reducer;


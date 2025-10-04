import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: null,
    error: null,
    user: null
}

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState: initialState,
    reducers: {
        SetUser: (state, action) => {
            state.user = action.payload;
        },
        Logout: (state) => {
            state.user = null;
            state.error = null;
            state.loading = null;
        }
    }
})

export default AuthSlice.reducer;
export const { SetUser, Logout } = AuthSlice.actions;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: {
        email: "",
        token:""
    },
    isLoading: true,
    isError: false,
    error: ""
}
export const createUser = createAsyncThunk('auth/createUser', async (data) => {
    const res = await fetch(
        'http://localhost:5000/api/registration',
        {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    );
    const result = await res.json(); 
    if(result){
        localStorage.setItem('accessToken', result.token);
        return {result,data}
    }
})

export const login = createAsyncThunk('auth/login',async(data)=>{
    const res = await fetch(
        'http://localhost:5000/api/login',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    );
    const result = await res.json(); 
    if(result){
        return {result,data}
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(createUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user.email = payload.data.email
                state.user.token = payload.result.token
                state.isError = false;
                state.error = "";
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user.email = "";
                state.user.token = "";
                state.error = action.error.message;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user.email = payload.data.email
                state.user.token = payload.result.token
                state.isError = false;
                state.error = "";
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user.email = "";
                state.user.token = "";
                state.error = action.error.message;
            })
        }
    })

    export default authSlice.reducer
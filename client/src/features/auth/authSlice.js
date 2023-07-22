import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useQuery } from "react-query";
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
        'https://power-hack-server-abjy.onrender.com/api/registration',
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
        'https://power-hack-server-abjy.onrender.com/api/login',
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
        localStorage.setItem('accessToken', result.token);
        return {result,data}
    }
})
export const getMe = createAsyncThunk('auth/getMe',()=>{
        const { data, isLoading } = useQuery('getMe', () => fetch(`https://power-hack-server-abjy.onrender.com/api/login`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json())
        )
        console.log(data)
    if(data){
        return data
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        logOut: (state) => {
            state.user = { email: "", token: "" }
            localStorage.removeItem('accessToken')
        },
        toogleLoading: (state) => {
            state.isLoading = false
        }
    },
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
            .addCase(getMe.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(getMe.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user.email = payload.user
                state.isError = false;
                state.error = "";
            })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user.email = "";
                state.user.token = "";
                state.error = action.error.message;
            })
        }
    })

    export const{ logOut,toogleLoading}= authSlice.actions
    export default authSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        userData : undefined,
        loading : true,
        city : null,
    }, 
    reducers : {  //har ek state k liye ek reducer hota h ki hume uss state m kaise changes krne h 
        setUserData : (state, action) => {
            state.userData = action.payload;
        },
        setLoading : (state, action) => {
            state.loading = action.payload;
        },
        setCity : (state, action) => {
            state.city = action.payload;
        }
    }
});

export const {setUserData, setLoading, setCity} = userSlice.actions;
export const userReducer =  userSlice.reducer;
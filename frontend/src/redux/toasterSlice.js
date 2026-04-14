import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";


const toastSlice = createSlice({
    name : "toast",
    initialState : {
        message : "",
        show : false
    },
    reducers : {
        showToast : (state, action) => {
            state.message = action.payload;
            state.show = true
        },
        hideToast : (state) => {
            state.message = "",
            state.show = false
        }
    }
});

export const {showToast, hideToast} = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from './userSlice'
import { toastReducer } from "./toasterSlice";


export const store = configureStore({
    reducer : {
        user : userReducer,
        toast : toastReducer
    }
});
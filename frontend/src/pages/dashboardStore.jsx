import { configureStore } from "@reduxjs/toolkit";
import contentsReducer from "./dashboard/dashboardSlice";

export const store = configureStore({
    reducer: {
        contentsController: contentsReducer
    }
})

// import { createStore } from 'redux';
//
// export const store = createStore();


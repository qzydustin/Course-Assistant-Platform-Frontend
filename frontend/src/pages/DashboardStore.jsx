import { configureStore } from "@reduxjs/toolkit";
import contentsReducer from "./DashboardSlice";

export const store = configureStore({
    reducer: {
        contentsController: contentsReducer,
    },
    devTools: true // TODO
})

// import { createStore } from 'redux';
//
// export const store = createStore();


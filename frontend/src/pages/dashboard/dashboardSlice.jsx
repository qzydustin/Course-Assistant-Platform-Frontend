import { createSlice } from '@reduxjs/toolkit'

const pageContent = {
    'Front page': [
        { id: 'Content', value: true},
        { id: 'Content1', value: false},
    ],
    'Switch 1': [
        { id: 'Content', value: false},
        { id: 'Content1', value: true},
    ],
}

export const contentsSlice = createSlice({
    name: 'contentsController',
    initialState: {

        isContentShown: false,
        isContent1Shown: false,
    },
    reducers: {
        toFrontPage: (state) => {
            state.isContentShown = pageContent["Front page"][0].value;
            state.isContent1Shown = pageContent["Front page"][1].value;
        },
        toSwitch1: (state) => {
            state.isContentShown = pageContent["Switch 1"][0].value;
            state.isContent1Shown = pageContent["Switch 1"][1].value;
        },
    }
})

// Action creators are generated for each case reducer function
export const { toFrontPage, toSwitch1 } = contentsSlice.actions

export const selectController = (state) => state.contentsController.isContent1Shown

export default contentsSlice.reducer
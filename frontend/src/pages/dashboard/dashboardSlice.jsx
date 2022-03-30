import { createSlice } from '@reduxjs/toolkit'

const pageContent = {
    'Front page': [
        { id: 'Content', value: true },
        { id: 'Content1', value: false },
        { id: 'SearchCourse', value: false },
    ],
    'Switch 1': [
        { id: 'Content', value: false},
        { id: 'Content1', value: true},
    ],
    'Course Enroll': [
        { id: 'Content', value: false},
        { id: 'Content1', value: false},
        { id: 'SearchCourse', value: true },
    ],
}

export const contentsSlice = createSlice({
    name: 'contentsController',
    initialState: {
        isContentShown: false,
        isContent1Shown: false,
        isSearchCourseShown: false,
    },
    reducers: {
        toFrontPage: (state) => {
            state.isContentShown = pageContent["Front page"][0].value;
            state.isContent1Shown = pageContent["Front page"][1].value;
            state.isSearchCourseShown = pageContent["Front page"][2].value;
        },
        toSwitch1: (state) => {
            state.isContentShown = pageContent["Switch 1"][0].value;
            state.isContent1Shown = pageContent["Switch 1"][1].value;
            state.isSearchCourseShown = pageContent["Switch 1"][2].value;
        },
        toCourseEnroll: (state) => {
            state.isContentShown = pageContent["Course Enroll"][0].value;
            state.isContent1Shown = pageContent["Course Enroll"][1].value;
            state.isSearchCourseShown = pageContent["Course Enroll"][2].value;
        },
    }
})

// Action creators are generated for each case reducer function
export const { toFrontPage, toSwitch1, toCourseEnroll} = contentsSlice.actions

export const selectController = (state) => state.contentsController.isContent1Shown

export default contentsSlice.reducer
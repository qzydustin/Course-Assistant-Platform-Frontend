import { createSlice } from '@reduxjs/toolkit'

const pageContent = {
    'Calendar': [
        { id: 'Calendar', value: true},
        { id: 'CreatCourse', value: false },
        { id: 'SearchCourse', value: false },
        { id: 'Settings', value: false },
    ],
    'Create Course': [
        { id: 'Calendar', value: false},
        { id: 'CreateCourse', value: true },
        { id: 'SearchCourse', value: false },
        { id: 'Settings', value: false },
    ],
    'Course Enroll': [
        { id: 'Calendar', value: false},
        { id: 'CreatCourse', value: false },
        { id: 'SearchCourse', value: true },
        { id: 'Settings', value: false },
    ],
    'Setting': [
        { id: 'Calendar', value: false},
        { id: 'CreatCourse', value: false },
        { id: 'SearchCourse', value: false },
        { id: 'Settings', value: true },
    ],
}

export const contentsSlice = createSlice({
    name: 'contentsController',
    initialState: {
        email: localStorage.getItem("myEmail"),
        password: localStorage.getItem("myPassword"),
        type: localStorage.getItem("myType"),
        userName: localStorage.getItem("myUserName"),
        isCalendar: true,
        isCreateCourseShown: false,
        isSearchCourseShown: false,
        isSettings: false,
        isNewPost: false,
        isPostOpen: false,
        isNewAssignment: false,
        activeAssignment: null,
        activeCourse: '',
        searchedCourse: [],
        enrollingCourse: [],
        enrolledCourse: [],
        activeTab: 0,
        server:{host: localStorage.getItem("myServer")},
        posts:[],
        activePostID:{},
        activeComments:[],
        activeAnnouncement:[],
        assignments:[],
        isCourseRenewed: false,
        assignmentsSubmission:null,
    },
    reducers: {
        saveEmail: (state, action) => {
            state.email = action.payload
        },
        savePassword: (state, action) => {
            state.password = action.payload
        },
        saveType: (state, action) => {
            state.type = action.payload
        },
        saveUserName: (state, action) => {
            state.userName = action.payload
        },
        toCalendar: (state) => {
            state.isCalendar = pageContent["Calendar"][0].value;
            state.isCreateCourseShown = pageContent["Calendar"][1].value;
            state.isSearchCourseShown = pageContent["Calendar"][2].value;
            state.isSettings = pageContent["Calendar"][3].value;
        },
        toCreateCourse: (state) => {
            state.isCalendar = pageContent["Create Course"][0].value;
            state.isCreateCourseShown = pageContent["Create Course"][1].value;
            state.isSearchCourseShown = pageContent["Create Course"][2].value;
            state.isSettings = pageContent["Create Course"][3].value;
        },
        toCourseEnroll: (state) => {
            state.isCalendar = pageContent["Course Enroll"][0].value;
            state.isCreateCourseShown = pageContent["Course Enroll"][1].value;
            state.isSearchCourseShown = pageContent["Course Enroll"][2].value;
            state.isSettings = pageContent["Course Enroll"][3].value;
        },
        toSettings: (state) => {
            state.isCalendar = pageContent["Setting"][0].value;
            state.isCreateCourseShown = pageContent["Setting"][1].value;
            state.isSearchCourseShown = pageContent["Setting"][2].value;
            state.isSettings = pageContent["Setting"][3].value;
        },
        toActiveCourse:(state,action) => {
            state.isCalendar = false;
            state.isCreateCourseShown = false;
            state.isSearchCourseShown = false;
            state.isSettings = false;
            state.activeCourse = action.payload;
            state.activeTab = 0;
        },
        toCreateAssignment:(state) => {
            state.isNewAssignment = true
        },
        toActiveAssignment:(state) => {
            state.isNewAssignment = false
        },
        renewSearchedCourse:(state, action) => {
            state.searchedCourse = action.payload
        },
        addEnrollCourse:(state, action) => {
            state.enrollingCourse = [...state.enrollingCourse, JSON.parse(action.payload)]
        },
        removeEnrollCourse:(state, action) => {
            state.enrollingCourse = state.enrollingCourse.filter(course =>
                (course.code !== JSON.parse(action.payload).code || course.semester !== JSON.parse(action.payload).semester))
        },
        renewEnrolledCourse:(state, action) => {
            state.enrolledCourse = action.payload
        },
        toChangeTab:(state, action) => {
            state.activeTab = action.payload
        },
        saveServer:(state, action) => {
            state.server = action.payload
        },
        renewPosts:(state, action) =>{
            state.posts = action.payload
        },
        renewActivePost:(state, action) =>{
            state.activePostID = action.payload
        },
        renewActiveComments:(state,action) =>{
            state.activeComments = action.payload
        },
        addActiveComments:(state,action) =>{
            state.activeComments = [...state.activeComments, action.payload]
        },
        renewActiveAnnouncements: (state, action) => {
            state.activeAnnouncement = action.payload
        },
        renewActiveAssignment: (state, action) => {
            state.activeAssignment = action.payload
        },
        renewAssignments: (state, action) => {
            state.assignments = action.payload
        },
        renewAssignmentSubmission: (state, action) => {
            state.assignmentsSubmission = action.payload
        },
        toNewPost: (state) => {
            state.isNewPost = true
        },
        toPost: (state) => {
            state.isNewPost = false
        },
        toRenewCourse: (state) => {
            state.isCourseRenewed = true
        },
        toNotRenewCourse: (state) => {
            state.isCourseRenewed = false
        },
        toOpenPost:(state) => {
            state.isPostOpen = true
        },
        toClosePost:(state) =>{
            state.isPostOpen = false
        },
    }
})

// Action creators are generated for each case reducer function
export const { saveEmail, savePassword, saveType, saveUserName,
    toCalendar, toCreateCourse, toSettings,
    toCourseEnroll, toActiveCourse, toCreateAssignment,
    toActiveAssignment,renewSearchedCourse,
    addEnrollCourse, removeEnrollCourse, renewEnrolledCourse,
    toChangeTab, saveServer,
    renewPosts, renewActivePost, renewActiveComments, addActiveComments,
    renewActiveAnnouncements, renewAssignments, renewActiveAssignment,renewAssignmentSubmission,
    toNewPost, toPost: toCloseNewPost, toRenewCourse, toNotRenewCourse, toOpenPost, toClosePost,
    } = contentsSlice.actions


export default contentsSlice.reducer
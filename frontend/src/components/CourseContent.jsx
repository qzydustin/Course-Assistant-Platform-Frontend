import * as React from 'react';
import Grid from '@mui/material/Grid';
import {useDispatch, useSelector} from "react-redux";
import Discussion from './CoursePlaza/Discussion';
import axios from "axios";
import {
    toChangeTab,
    renewActiveAnnouncements,
    renewActiveComments,
    renewActivePost,
    renewPosts,
    toNotNewPost, toOpenPost, toRenewCourse, renewAssignments
} from "../pages/DashboardSlice";
import AnnouncementPanel from './CoursePlaza/AnnouncementPanel';
import Management from './CoursePlaza/Management';
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import Box from "@mui/material/Box";
import Assignment from './CoursePlaza/Assignment'
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import MyCalendar from "./CoursePlaza/Calendar";
import 'react-big-calendar/lib/sass/styles.scss';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';
import AssignmentPanel from "./CoursePlaza/AssignmentPanel"; // if using DnD
import DiscussionPanel from "./CoursePlaza/DiscussionPanel"; // if using DnD



export default function CourseContent() {
    const dispatch = useDispatch();

    const email = localStorage.getItem('myEmail')
    const password = localStorage.getItem('myPassword')
    const type = localStorage.getItem('myType')
    const server = localStorage.getItem('myServer');

    const courseID = useSelector(state => state.contentsController.activeCourse)[0].id;
    const activeTab = useSelector(state => state.contentsController.activeTab);
    const isRenewed = useSelector(state => state.contentsController.isCourseRenewed);

    let userCourse = {}
    if(courseID && !isRenewed){
        userCourse = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "courseID": courseID
        })

        dispatch(toRenewCourse())
        axios.post(server+'/get-posts',
            userCourse,
            {headers: {'Content-Type': 'application/json'}})
            .then(function(response) {
                // console.log(response.data.data);
                if(response.data.code === 1000){

                    dispatch(renewPosts(response.data.data.map( post => ({
                        title: post.title,
                        author: post.posterName,
                        contents: post.content,
                        postID: post.id
                    }))));
                }
            });

        console.log("getAnnouncements: ", userCourse);
        axios.post(server+'/get-announcements',
            userCourse,
            {headers: {'Content-Type': 'application/json'}})
            .then(function(response) {
                // console.log(response.data.data);
                if(response.data.code === 1000){
                    dispatch(renewActiveAnnouncements(response.data.data))
                }
            });

        console.log("getAssignments: ", userCourse);
        axios.post(server+'/get-assignments',
            userCourse,
            {headers: {'Content-Type': 'application/json'}})
            .then(function(response) {
                // console.log(response.data.data);
                if(response.data.code === 1000){
                    dispatch(renewAssignments(response.data.data))
                }
            });
    }


    if (activeTab === 0){
        return (
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Accordion sx={{m:1}} defaultExpanded={true}>
                        <AccordionSummary>
                            Course Calendar
                        </AccordionSummary>
                        <AccordionDetails>
                            <MyCalendar/>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={4}>
                    <AnnouncementPanel/>
                    <DiscussionPanel/>
                    <AssignmentPanel/>
                </Grid>
            </Grid>
        )
    }

    if (activeTab === 1) {
        return (
            <Discussion/>
        )
    }

    if (activeTab === 2) {
        return (
            <Assignment/>
        )
    }

    if (activeTab === 3) {
        return (
            <Management/>
        )
    }
}
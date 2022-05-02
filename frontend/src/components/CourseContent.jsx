import * as React from 'react';
import Grid from '@mui/material/Grid';
import {useDispatch, useSelector} from "react-redux";
import Discussion from './CoursePlaza/Discussion';
import axios from "axios";
import {
    renewActiveAnnouncements,
    renewPosts,
    toRenewCourse, renewAssignments
} from "../pages/DashboardSlice";
import AnnouncementPanel from './CoursePlaza/AnnouncementPanel';
import Management from './CoursePlaza/Management';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from "@mui/material";
import Assignment from './CoursePlaza/Assignment'
import MyCalendar from "./CoursePlaza/Calendar";
import 'react-big-calendar/lib/sass/styles.scss';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';
import AssignmentPanel from "./CoursePlaza/AssignmentPanel"; // if using DnD
import DiscussionPanel from "./CoursePlaza/DiscussionPanel"; // if using DnD

import templateevents from './CoursePlaza/events'

export default function CourseContent() {
    const dispatch = useDispatch();

    const email = localStorage.getItem('myEmail')
    const password = localStorage.getItem('myPassword')
    const type = localStorage.getItem('myType')
    const server = localStorage.getItem('myServer');

    const activeCourse = useSelector(state => state.contentsController.activeCourse)[0];
    const courseID = useSelector(state => state.contentsController.activeCourse)[0].id;
    const activeTab = useSelector(state => state.contentsController.activeTab);
    const isRenewed = useSelector(state => state.contentsController.isCourseRenewed);

    let events = []

    let firstDay = new Date(2022, 1, 23)  // Always Sunday
    let weeksInSemester = 16
    let weekDay = activeCourse.weekday.split(",")
    for(let day=0; day<weekDay.length; day++){
        switch(weekDay[day]) {
            case "Monday": weekDay[day] = 1;break;
            case "Tuesday": weekDay[day] = 2;break;
            case "Wednesday": weekDay[day] = 3;break;
            case "Thursday": weekDay[day] = 4;break;
            case "Friday": weekDay[day] = 5;break;
            case "Saturday": weekDay[day] = 6;break;
            case "Sunday": weekDay[day] = 0;break;
        }
    }
    console.log("weekday is ", weekDay)
    for(let week=0; week<weeksInSemester; week++){

        for(let day=0;day<weekDay.length;day++){
            let addEvent = {
                'title': activeCourse.title,
                'start': new Date(firstDay.getTime() + weekDay[day] * 24 * 60 * 60 * 1000),
                'end': new Date(firstDay.getTime() + weekDay[day] * 25 * 60 * 60 * 1000),
            }

            events = [
                ...events,
                addEvent
            ]
        }
        firstDay = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
    }
    console.log("events is ", events)
    console.log("templateevents is ", templateevents)


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
                            <MyCalendar events={events}/>
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
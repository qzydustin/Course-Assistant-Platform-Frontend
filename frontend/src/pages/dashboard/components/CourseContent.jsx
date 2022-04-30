import * as React from 'react';
import Grid from '@mui/material/Grid';
import {useDispatch, useSelector} from "react-redux";
import Discussion from './coursecomponents/Discussion';
import axios from "axios";
import {
    changeTab,
    renewActiveAnnouncements,
    renewActiveComments,
    renewActivePost,
    renewPosts,
    toNotNewPost, toRenewCourse
} from "../dashboardSlice";
import AnnouncementPanel from './coursecomponents/AnnouncementPanel';
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
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
import Assignment from './coursecomponents/Assignment'
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import MyCalendar from "./coursecomponents/Calendar";
import 'react-big-calendar/lib/sass/styles.scss';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'; // if using DnD



export default function CourseContent() {
    const dispatch = useDispatch();

    const email = localStorage.getItem('myEmail')
    const password = localStorage.getItem('myPassword')
    const type = localStorage.getItem('myType')
    const server = localStorage.getItem('myServer');

    const courseID = useSelector(state => state.contentsController.activeCourse).id
    const activeTab = useSelector(state => state.contentsController.activeTab);
    const posts = useSelector(state => state.contentsController.posts);
    const isRenewed = useSelector(state => state.contentsController.isCourseRenewed);

    const [announcement, setAnnouncement] = React.useState([]);
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

        // console.log("getAnnouncements: ", userCourse);
        axios.post(server+'/get-announcements',
            userCourse,
            {headers: {'Content-Type': 'application/json'}})
            .then(function(response) {
                // console.log(response.data.data);
                if(response.data.code === 1000){
                    dispatch(renewActiveAnnouncements(response.data.data))
                    // dispatch(renewPosts(response.data.data.map( post => ({
                    //     title: post.title,
                    //     author: post.posterName,
                    //     contents: post.content,
                    //     postID: post.id
                    // }))));
                }
            });
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCreateAnnouncement = (event) => {
        event.preventDefault();
        setOpen(false);
        const announcementCreationForm = new FormData(event.currentTarget);

        let creatAnnouncement = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "courseID": courseID,
            "title": announcementCreationForm.get("title"),
            "content": announcementCreationForm.get("content")
        })
        // console.log("createAnnouncements: ", creatAnnouncement);
        axios.post(server + '/create-announcement',
            creatAnnouncement,
            {headers: {'Content-Type': 'application/json'}})
            .then(function (response) {
                if (response.data.code === 1000) {

                    axios.post(server + '/get-announcements',
                        userCourse,
                        {headers: {'Content-Type': 'application/json'}})
                        .then(function (response) {
                            if (response.data.code === 1000) {
                                dispatch(renewActiveAnnouncements(response.data.data))
                            }
                        })
                }
            })
    }

    if (activeTab === 0){
        return (
            <div>
                <Grid item xs={8}><MyCalendar/></Grid>
                <Grid item xs={4}>
                <Accordion sx={{ position: "fixed", top:220, right: 25 }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Grid item xs>
                            Announcement
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                {(type === 'instructor')? (<Button sx={{ mr: 1 }} onClick={handleClickOpen}>
                                    New Announcement
                                </Button>):null}
                                <Dialog open={open} onClose={handleClose}>
                                    <Box
                                        component="form"
                                        noValidate
                                        autoComplete="off"
                                        onSubmit={handleCreateAnnouncement}
                                    >
                                        <DialogTitle>New Announcement</DialogTitle>
                                        <DialogContent>
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="title"
                                                label="Title"
                                                type="Title"
                                                name="title"
                                                fullWidth
                                                variant="outlined"
                                            />
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="content"
                                                label="Contents"
                                                name="content"
                                                type="content"
                                                fullWidth
                                                variant="outlined"
                                                multiline
                                                rows={8}
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Cancel</Button>
                                            <Button type="submit">Publish</Button>
                                        </DialogActions>
                                    </Box>
                                </Dialog>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                    <AnnouncementPanel/>
                </Accordion>
                </Grid>
            </div>
        )
    }

    if (activeTab === 1) {
        return (
            <Grid>
                <Discussion/>
            </Grid>
        )
    }

    if (activeTab === 2) {
        return (
            <Assignment/>
        )
    }

    if (activeTab === 3) {
        return (<Grid/>)
    }
}
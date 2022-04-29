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
    const activeAnnouncements = useSelector(state => state.contentsController.activeAnnouncement);

    let userCourse = {}
    if(courseID && !isRenewed){
        userCourse = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "courseID": courseID
        })
        console.log("getPosts", userCourse)
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

        // console.log("getAnnouncements")
        axios.post(server+'/get-announcements',
            userCourse,
            {headers: {'Content-Type': 'application/json'}})
            .then(function(response) {
                console.log("getAnnouncements", response.data.data);
                if(response.data.code === 1000){
                    dispatch(renewActiveAnnouncements(response.data.data))

                }
            });
    }

    const [newAssignmentOpen, setNewAssignmentOpen] = React.useState(false);
    // const [isNewPost, setIsNewPost] = React.useState(false);
    const [assignmentOpen, setAssignmentOpen] = React.useState(false);

    const handleNewAnnouncementClick = () => {
        setNewAssignmentOpen(true);
    };
    const handleAnnouncementClick = () => {
        setAssignmentOpen(true);
    };

    const handleNewAnnouncementClose = () => {
        setNewAssignmentOpen(false);
    };
    const handleAnnouncementClose = () => {
        setAssignmentOpen(false);
    };


    const handleCreateAnnouncement = (event) => {
        event.preventDefault();
        setNewAssignmentOpen(false);
        const announcementCreationForm = new FormData(event.currentTarget);
        console.log("handleCreateAnnouncement")
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

    function handleMainPostClick(postID) {
        dispatch(toNotNewPost())
        dispatch(renewActivePost(postID))
        dispatch(changeTab(1));
        handleGetComment(postID);
    }

    function handleGetComment(postID){
        let comments = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "courseID": courseID,
            "postID": postID,
        })
        console.log("get comments is : ", comments);
        axios.post(server + '/get-comments',
            comments,
            {headers: {'Content-Type': 'application/json'}})
            .then(function (response) {
                console.log("get comment response is ", response.data);
                if (response.data.code === 1000) {
                    dispatch(renewActiveComments(response.data.data));
                }
            });
    }

    console.log("activeTab is ", activeTab)
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
                                {(type === 'instructor')? (<Button sx={{ mr: 1 }} onClick={handleNewAnnouncementClick}>
                                    New Announcement
                                </Button>):null}
                                <Dialog open={newAssignmentOpen} onClose={handleNewAnnouncementClose}>
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
                                            <Button onClick={handleNewAnnouncementClose}>Cancel</Button>
                                            <Button type="submit">Publish</Button>
                                        </DialogActions>
                                    </Box>
                                </Dialog>
                            </Grid>
                            {activeAnnouncements.map( (announcement) => (
                                <ListItem key={announcement.id}>
                                    <ListItemButton sx={{ mr: 1 }} onClick={handleAnnouncementClick}>
                                        <ListItemText>
                                            {announcement.title}
                                        </ListItemText>
                                        <Dialog open={assignmentOpen} onClose={handleAnnouncementClose}>
                                            <Box
                                                component="form"
                                                noValidate
                                                autoComplete="off"
                                                onSubmit={handleCreateAnnouncement}
                                            >
                                                <DialogTitle>{announcement.title}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-slide-description">
                                                        {announcement.content}
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleAnnouncementClose}>Cancel</Button>
                                                    <Button type="submit">Publish</Button>
                                                </DialogActions>
                                            </Box>
                                        </Dialog>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ position: "fixed", top :400, right: 25 }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Discussion</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {posts.map((thread) => (
                                <Grid>
                                    <ListItem key={thread.postID}>
                                        <ListItemButton disableGutters={true}
                                                        padding={0}
                                                        onClick={() => handleMainPostClick(thread.postID)}>
                                            <ListItemAvatar>
                                                <Avatar alt="Post" src="/static/images/avatar/1.jpg"/>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={thread.title}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            sx={{display: 'inline'}}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {thread.author}:
                                                        </Typography>
                                                        {thread.contents}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider variant="inset"/>
                                </Grid>
                            ))}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                </Grid>
            </div>
        )
    }

    if (activeTab === 1) {
        return (
            <Grid>
                <Discussion />
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

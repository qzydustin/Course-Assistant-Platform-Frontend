import * as React from 'react';
import Grid from '@mui/material/Grid';
import {useDispatch, useSelector} from "react-redux";
import Discussion from './coursecomponents/Discussion';
import axios from "axios";
import {renewActiveAnnouncements, renewPosts} from "../dashboardSlice";
import AnnouncementPanel from './coursecomponents/AnnouncementPanel';
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Box from "@mui/material/Box";


export default function CourseContent() {

    const activeTab = useSelector(state => state.contentsController.activeTab);
    console.log("activeTab is ", activeTab);
    let email = localStorage.getItem('myEmail')
    let password = localStorage.getItem('myPassword')
    let type = localStorage.getItem('myType')
    let courseID = useSelector(state => state.contentsController.activeCourse).id
    const dispatch = useDispatch();
    const server = useSelector(state => state.contentsController.server);

    const [announcement, setAnnouncement] = React.useState([]);
    let userCourse = {}
    if(courseID){
        userCourse = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "courseID": courseID
        })

        // console.log("getPost: ", getPost);
        axios.post(server.host+'/get-posts',
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
        axios.post(server.host+'/get-announcements',
            userCourse,
            {headers: {'Content-Type': 'application/json'}})
            .then(function(response) {
                console.log(response.data.data);
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
        console.log("createAnnouncements: ", creatAnnouncement);
        axios.post(server.host + '/create-announcement',
            creatAnnouncement,
            {headers: {'Content-Type': 'application/json'}})
            .then(function (response) {
                if (response.data.code === 1000) {

                    axios.post(server.host + '/get-announcements',
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

    return (
        <Grid container>
            {(activeTab === 0) ? (
                <Grid>
                    <Paper sx={{ position: "fixed", top:220, right: 25 }}>
                        <AppBar
                            position="static"
                            color="grey"
                            elevation={0}
                        >
                            <Toolbar>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs>
                                        Announcement
                                    </Grid>
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
                            </Toolbar>
                        </AppBar>
                        <AnnouncementPanel/>
                    </Paper>
                </Grid>) : null}
            {(activeTab === 1) ? (
                <Grid>
                    <Discussion/>
                </Grid>) : null}
        </Grid>
    );
}

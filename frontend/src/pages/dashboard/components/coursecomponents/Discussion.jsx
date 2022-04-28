import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import ListItemButton from "@mui/material/ListItemButton";
import {Stack, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Button from "@mui/material/Button";
import * as PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {renewActivePost, renewActiveComments, addActiveComments} from "../../dashboardSlice";

function Div(props) {
    return null;
}

Div.propTypes = {
    spacing: PropTypes.number,
    children: PropTypes.node
};

export default function Discussion() {

    let email = localStorage.getItem('myEmail')
    let password = localStorage.getItem('myPassword')
    let type = localStorage.getItem('myType')
    let courseID = useSelector(state => state.contentsController.activeCourse).id
    const server = useSelector(state => state.contentsController.server);
    const dispatch = useDispatch();
    const [isNewPost, setIsNewPost] = React.useState(false);
    const [isPostOpened, setIsPostOpened] = React.useState(false);
    let posts = useSelector(state => state.contentsController.posts);
    let activeComments = useSelector(state => state.contentsController.activeComments);
    const activePostID = useSelector(state => state.contentsController.activePostID);

    function handleThreadClick(postID) {
        setIsNewPost(false)
        setIsPostOpened(true)
        dispatch(renewActivePost(postID))
        handleGetComment(postID);
    }

    const handleNewPostClick = (event) => {
        event.preventDefault()
        setIsNewPost(true)
    }

    const handleNewPostSubmit = (event) => {
        // console.log("handle post submit")
        event.preventDefault();
        const postCreationForm = new FormData(event.currentTarget);

        let post = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "courseID": courseID,
            "title": postCreationForm.get("title"),
            "content": postCreationForm.get("contents")
        })
        // console.log("Post is : ", post);
        axios.post(server.host + '/create-post',
            post,
            {headers: {'Content-Type': 'application/json'}})
            .then(function (response) {
                console.log(response.data.message);
                if (response.data.code === 1000) {
                }
                // handleThreadClick(postID)
            });

    }

    const handleNewCommentSubmit = (event) => {
        console.log("handle commnent submit")
        event.preventDefault();
        const postCreationForm = new FormData(event.currentTarget);

        let newComment = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "courseID": courseID,
            "postID": activePostID,
            "content": postCreationForm.get("contents")
        })
        console.log("newComment is : ", newComment);
        axios.post(server.host + '/create-comment',
            newComment,
            {headers: {'Content-Type': 'application/json'}})
            .then(function (response) {
                console.log(response.data);
                if (response.data.code === 1000) {
                    handleGetComment(activePostID);
                }
            });
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
        axios.post(server.host + '/get-comments',
            comments,
            {headers: {'Content-Type': 'application/json'}})
            .then(function (response) {
                console.log("get comment response is ", response.data);
                if (response.data.code === 1000) {
                    dispatch(renewActiveComments(response.data.data));
                }
            });
    }

    return (
        <Grid container>
            <Grid xs={4}>
                <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                    <ListItem alignItems="flex-start">
                        <ListItemButton disableGutters={true}
                                        padding={0}
                                        onClick={handleNewPostClick}>
                            <ListItemAvatar>
                                <Avatar alt="N" src="/static/images/avatar/1.jpg"/>
                            </ListItemAvatar>
                            <ListItemText
                                primary="New Post"
                            />
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                    {posts.map((thread) => (
                        <Grid>
                            <ListItem>
                                <ListItemButton disableGutters={true}
                                                padding={0}
                                                onClick={() => handleThreadClick(thread.postID)}>
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
                </List>
            </Grid>
            {isNewPost ? (
                    <Grid xs={8} padding={3}>
                        <Divider orientation="vertical" flexItem/>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            onSubmit={handleNewPostSubmit}
                        >
                            <Grid m={1}>
                                <TextField fullWidth
                                           variant="outlined"
                                           label="Title"
                                           name="title"
                                           sx={{m: 1}}>
                                </TextField>
                                <TextField multiline
                                           fullWidth
                                           rows={8}
                                           variant="outlined"
                                           label="Contents"
                                           name="contents"
                                           sx={{m: 1}}>
                                </TextField>
                            </Grid>
                            <Grid padding={2}>
                                <Stack direction="row" spacing={10}>
                                    <Button variant="outlined"
                                            startIcon={<DeleteIcon/>}>
                                        Delete
                                    </Button>
                                    <Button variant="contained"
                                            type="submit"
                                            endIcon={<SendIcon/>}
                                    >
                                        Send
                                    </Button>
                                </Stack>
                            </Grid>
                        </Box>
                    </Grid>
                ) : (null)}
            {isPostOpened ? (
                    <Grid xs={8} padding={3}>
                    <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                        {activeComments.map((comment) => (
                            <Grid>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                        primary={comment.studentName}
                                        secondary={
                                            <React.Fragment>
                                                {comment.content}
                                            </React.Fragment>}
                                    />
                                </ListItem>
                                <Divider component="li"/>
                            </Grid>
                        ))}
                    </List>
                    <Grid m={1}>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            onSubmit={handleNewCommentSubmit}
                        >
                            {/*<TextField fullWidth*/}
                            {/*           variant="outlined"*/}
                            {/*           label="Title"*/}
                            {/*           name="title"*/}
                            {/*           sx={{m: 1}}>*/}
                            {/*</TextField>*/}
                            <TextField multiline
                                       fullWidth
                                       rows={8}
                                       variant="outlined"
                                       label="New Comments"
                                       name="contents"
                                       sx={{m: 1}}>
                            </TextField>
                            <Grid padding={2}>
                                <Stack direction="row" spacing={25}>
                                    <Button variant="outlined"
                                            startIcon={<DeleteIcon/>}>
                                        Delete
                                    </Button>
                                    <Button variant="contained"
                                            type="submit"
                                            endIcon={<SendIcon/>}
                                    >
                                        New Comment
                                    </Button>
                                </Stack>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>):(null)}
        </Grid>
    );
}
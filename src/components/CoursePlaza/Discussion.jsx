import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
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
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import {
    renewActiveComments,
    renewActivePost,
    renewPosts,
    toCloseNewPost,
    toClosePost,
    toNewPost,
    toOpenPost
} from "../../pages/DashboardSlice";
import Paper from "@mui/material/Paper";
import CapAlert from "../CapAlert";

function Div(props) {
    return null;
}

Div.propTypes = {
    spacing: PropTypes.number,
    children: PropTypes.node
};

export default function Discussion() {

    const dispatch = useDispatch();

    const [alert, setAlert] = React.useState({
        message: "",
        type: null
    })

    let email = localStorage.getItem('myEmail')
    let password = localStorage.getItem('myPassword')
    let type = localStorage.getItem('myType')
    const courseID = useSelector(state => state.contentsController.activeCourse)[0].id
    const server = localStorage.getItem('myServer');


    const isNewPost = useSelector(state => state.contentsController.isNewPost);
    const isPostOpened = useSelector(state => state.contentsController.isPostOpen);
    let posts = useSelector(state => state.contentsController.posts);
    let activeComments = useSelector(state => state.contentsController.activeComments);
    const activePostID = useSelector(state => state.contentsController.activePostID);
    const activePost = posts.filter(post => (post.postID === activePostID))[0]


    function handleThreadClick(postID) {
        dispatch(toCloseNewPost())
        dispatch(toOpenPost())
        dispatch(renewActivePost(postID))
        handleGetComment(postID);
    }

    const handleNewPostClick = (event) => {
        event.preventDefault()
        dispatch(toClosePost())
        dispatch(toNewPost())
    }

    const handleNewPostSubmit = (event) => {
        event.preventDefault();
        const postCreationForm = new FormData(event.currentTarget);

        let newPost = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "courseID": courseID,
            "title": postCreationForm.get("title"),
            "content": postCreationForm.get("contents")
        })
        axios.post(server + '/create-post',
            newPost,
            {headers: {'Content-Type': 'application/json'}})
            .then(function (response) {
                if (response.data.code === 1000) {
                    setAlert({message: response.data.message, type: "success"})
                    axios.post(server + '/get-posts',
                        newPost,
                        {headers: {'Content-Type': 'application/json'}})
                        .then(function (response) {
                            if (response.data.code === 1000) {
                                dispatch(renewPosts(response.data.data.map(post => ({
                                    title: post.title,
                                    author: post.posterName,
                                    contents: post.content,
                                    postID: post.id
                                }))));
                            } else {
                                setAlert({message: response.data.message, type: "error"})
                            }
                        });
                } else {
                    setAlert({message: response.data.message, type: "error"})
                }
            });

    }

    const handleNewCommentSubmit = (event) => {
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
        axios.post(server + '/create-comment',
            newComment,
            {headers: {'Content-Type': 'application/json'}})
            .then(function (response) {
                if (response.data.code === 1000) {
                    handleGetComment(activePostID);
                } else {
                    setAlert({message: response.data.message, type: "error"})
                }
            });
    }

    function handleGetComment(postID) {
        let comments = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "courseID": courseID,
            "postID": postID,
        })
        axios.post(server + '/get-comments',
            comments,
            {headers: {'Content-Type': 'application/json'}})
            .then(function (response) {
                if (response.data.code === 1000) {
                    dispatch(renewActiveComments(response.data.data));
                } else {
                    setAlert({message: response.data.message, type: "error"})
                }
            });
    }

    return (
        <div>
            <Grid item xs={12}>
                <CapAlert message={alert.message} type={alert.type}/>
            </Grid>
            <Paper>
                <Grid container m={1}>
                    <Grid item xs={4}>
                        <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                            <ListItem key="new post" alignItems="flex-start">
                                <ListItemButton disableGutters={true}
                                                padding={0}
                                                onClick={handleNewPostClick}>
                                    <ListItemAvatar>
                                        <AddCommentOutlinedIcon fontSize={"large"}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="New Post"
                                    />
                                </ListItemButton>
                            </ListItem>
                            <Divider component="li"/>
                            {posts.map((thread) => (
                                <div>
                                    <ListItem key={thread.postID}>
                                        <ListItemButton disableGutters={true}
                                                        padding={0}
                                                        onClick={() => handleThreadClick(thread.postID)}>
                                            <ListItemAvatar>
                                                <CommentOutlinedIcon fontSize={"large"}/>
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
                                                            {thread.author}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider/>
                                </div>
                            ))}
                        </List>
                    </Grid>
                    {isNewPost ? (
                        <Grid item xs={8} padding={3}>
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
                        <Grid item xs={8} padding={3}>
                            <ListItem key={activePost.postID} alignItems="flex-start">
                                <ListItemText
                                    primary={activePost.author}
                                    secondary={
                                        <React.Fragment>
                                            {activePost.contents}
                                        </React.Fragment>}
                                />
                            </ListItem>
                            <Divider/>
                            <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                                {activeComments.map((comment) => (
                                    <Grid>
                                        <ListItem key={comment.id} alignItems="flex-start">
                                            <ListItemText
                                                primary={comment.commenterName + " : "}
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
                        </Grid>) : (null)}
                </Grid>
            </Paper>
        </div>
    );
}
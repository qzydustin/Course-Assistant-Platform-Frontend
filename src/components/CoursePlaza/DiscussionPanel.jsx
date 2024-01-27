import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import Divider from "@mui/material/Divider";
import {useDispatch, useSelector} from "react-redux";
import {
    renewActiveComments,
    renewActivePost,
    toChangeTab,
    toCloseNewPost,
    toNewPost,
    toOpenPost
} from "../../pages/DashboardSlice";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";

export default function DiscussionPanel() {
    const dispatch = useDispatch();

    const email = localStorage.getItem('myEmail')
    const password = localStorage.getItem('myPassword')
    const type = localStorage.getItem('myType')
    const server = localStorage.getItem('myServer');

    const courseID = useSelector(state => state.contentsController.activeCourse)[0].id;
    const posts = useSelector(state => state.contentsController.posts);

    const handleNewPostClick = () => {
        dispatch(toNewPost())
        dispatch(toChangeTab(1))
        // dispatch(toCreateAssignment())
    };

    function handleActivePostClick(postID) {
        dispatch(toCloseNewPost())
        dispatch(renewActivePost(postID))
        dispatch(toOpenPost());
        dispatch(toChangeTab(1));
        handleGetComment(postID);
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
                }
            });
    }

    return (
        <Accordion sx={{right: 5}} defaultExpanded={true}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography>Discussion</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    <IconButton size="small" sx={{mr: 1}} onClick={handleNewPostClick}>
                        <AddIcon fontSize="inherit"/>
                        <div>New Post</div>
                    </IconButton>
                    {posts.map((thread) => (
                        <Grid>
                            <ListItem key={thread.postID}>
                                <ListItemButton disableGutters={true}
                                                padding={0}
                                                onClick={() => handleActivePostClick(thread.postID)}>
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
    )
}
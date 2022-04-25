import * as React from 'react';
import Grid from '@mui/material/Grid';
import {useDispatch, useSelector} from "react-redux";
import Discussion from './coursecomponents/Discussion';
import axios from "axios";
import {renewPosts} from "../dashboardSlice";

export default function CourseContent() {

    const activeTab = useSelector(state => state.contentsController.activeTab);
    console.log("activeTab is ", activeTab);
    let email = localStorage.getItem('myEmail')
    let password = localStorage.getItem('myPassword')
    let type = localStorage.getItem('myType')
    let courseID = useSelector(state => state.contentsController.activeCourse).id
    const dispatch = useDispatch();
    const server = useSelector(state => state.contentsController.server);

    if(courseID){
        let getPost = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "courseID": courseID
        })

        console.log("getPost: ", getPost);
        axios.post(server.host+'/get-posts',
            getPost,
            {headers: {'Content-Type': 'application/json'}})
            .then(function(response) {
                console.log(response.data.data);
                if(response.data.code === 1000){
                    dispatch(renewPosts(response.data.data.map( post => ({
                        title: post.title,
                        author: post.posterName,
                        contents: post.content,
                        postID: post.id
                    }))));
                }
            });
    }

    return (
        <Grid container>
            {(activeTab === 1) ? (
                <Grid>
                        <Discussion/>
                </Grid>) : null}
        </Grid>
    );
}

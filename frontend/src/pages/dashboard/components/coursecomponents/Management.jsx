import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Grid from "@mui/material/Grid";
import {useDispatch, useSelector} from "react-redux";
import {renewPosts, toFrontPage} from "../../dashboardSlice";
import axios from "axios";

export default function MenuListComposition(){

    const dispatch = useDispatch();
    const [isLeave, setIsLeave] = React.useState(false)
    const handleLeaveClick = (event) => {
        setIsLeave(true)
    }

    const email = localStorage.getItem('myEmail');
    const password = localStorage.getItem('myPassword');
    const type = localStorage.getItem('myType');
    const server = localStorage.getItem('myServer');
    const courseID = useSelector(state => state.contentsController.activeCourse).id


    const handleDropCourse = (event) => {
        let dropCourse = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "courseID": courseID,
        })
        dispatch(toFrontPage());
        axios.post(server+'/drop-course',
            dropCourse,
            {headers: {'Content-Type': 'application/json'}})
            .then(function(response) {
                if(response.data.code === 1000){
                }
            });
    }
    return (
    <Paper>
        <Grid container>
            <Grid item xs={4}>
                <MenuList>
                    <MenuItem>Course Details</MenuItem>
                    <MenuItem>My account</MenuItem>
                    <MenuItem onClick={handleLeaveClick}>Leave</MenuItem>
                </MenuList>
            </Grid>
            <Grid item xs={8}>
                <MenuList>
                    {/*<MenuItem>Profile</MenuItem>*/}
                    {/*<MenuItem>My account</MenuItem>*/}
                    {isLeave? (<MenuItem onClick={handleDropCourse}>Drop Course</MenuItem>):(null)}
                </MenuList>
            </Grid>
        </Grid>
    </Paper>
    )
}
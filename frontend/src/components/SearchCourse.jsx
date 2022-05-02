import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Row from './SearchCourseTableRow';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {renewSearchedCourse} from '../pages/DashboardSlice';
import Avatar from "@mui/material/Avatar";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import {blue} from "@mui/material/colors";
import CapAlert from "./CapAlert";

const departments = [
    {value: 'Empty', label: ''},
    {value: 'computer science', label: 'Computer Science',},
    {value: 'Engineering', label: 'Engineering',},
    {value: 'Mathematics', label: 'Mathematics',},
];

const offeredTimes = [
    {value: 'Empty', label: ''},
    {value: '2022 spring', label: '2022 Spring',},
    {value: '2022 summer', label: '2022 Summer',},
    {value: '2022 fall', label: '2022 Fall',},
    {value: '2022 winter', label: '2022 Winter',},
];


export default function SearchCourse({server}) {

    const dispatch = useDispatch();
    const [alert, setAlert] = React.useState({
        message: "",
        type: null
    })

    let email = localStorage.getItem('myEmail')
    let password = localStorage.getItem('myPassword')
    let type = localStorage.getItem('myType')


    const [department, setDepartment] = React.useState('Empty');
    const [offeredTime, setOfferedTime] = React.useState('Empty');
    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
    }
    const handleOfferedTimeChange = (event) => {
        setOfferedTime(event.target.value);
    }
    const handleSearchCourse = (event) => {
        event.preventDefault();

        const courseSearchForm = new FormData(event.currentTarget);
        let data = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "department": courseSearchForm.get("department"),
            "semester": courseSearchForm.get("offered time"),
        })

        axios.post(server+'/get-courses',
            data,
            {headers: {'Content-Type': 'application/json'}})
            .then(function(response) {
                if(response.data.code === 1000){
                    setAlert({message: response.data.message, type: "success"})
                    dispatch(renewSearchedCourse(response.data.data));
                } else {
                    setAlert({message: response.data.message, type: "error"})
                    dispatch(renewSearchedCourse([]));
                }
            });
    };

    let enrollingCourse = useSelector(state => state.contentsController.enrollingCourse);
    const handleEnroll = (event) => {
        event.preventDefault();

        for (let i = 0; i < enrollingCourse.length; i++) {
            let enrollCourse = [];
            if (type === "instructor") {
                enrollCourse = JSON.stringify({
                    "email": email,
                    "password": password,
                    "type": type,
                    "code": enrollingCourse[i]["code"],
                    "semester": enrollingCourse[i]["semester"],
                    "student_email": "Smith@test.com"
                })
            } else {
                enrollCourse = JSON.stringify({
                    "email": email,
                    "password": password,
                    "type": type,
                    "code": enrollingCourse[i]["code"],
                    "semester": enrollingCourse[i]["semester"],
                })
            }

            axios.post(server + '/enroll-course',
                enrollCourse,
                {headers: {'Content-Type': 'application/json'}})
                .then(function (response) {
                    if (response.data.code === 1000) {
                        setAlert({message: response.data.message + {enrollingCourse}[i]["code"], type: "success"})
                        axios.post(server + '/get-enrolled-courses',
                            enrollCourse,
                            {headers: {'Content-Type': 'application/json'}}).then();

                    } else {
                        setAlert({message: response.data.message, type: "error"})
                    }
                });
        };

    }

    const courseList = useSelector(state => state.contentsController.searchedCourse);

    const [openSearchCourseDialog, setOpenSearchCourseDialog] = React.useState(false)

    const handleCloseSearchCourseDialog = (event) =>{
        setOpenSearchCourseDialog(false)
    }

    return (
        <div>
            <Grid item xs={12} m={2}>
                <CapAlert message={alert.message} type={alert.type}/>
            </Grid>
            <Paper sx={{maxWidth: 936, margin: 'auto', overflow: 'hidden'}}>
                <Box
                    component="form"
                    sx={{'& .MuiTextField-root': {m: 1.5, width: '20ch'},}}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSearchCourse}
                >
                    <AppBar
                        position="static"
                        color="default"
                        elevation={0}
                        sx={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)'}}
                    >
                        <Toolbar>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <SearchIcon color="inherit" sx={{display: 'block'}}/>
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        id="Department"
                                        select
                                        name="department"
                                        label="Department"
                                        value={department}
                                        onChange={handleDepartmentChange}
                                    >
                                        {departments.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        id="Offered Time"
                                        select
                                        name="offered time"
                                        label="Offered Time"
                                        value={offeredTime}
                                        onChange={handleOfferedTimeChange}
                                    >
                                        {offeredTimes.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item>
                                    <Button type="submit"
                                            variant="contained"
                                            sx={{mr: 1}}>
                                        Search Course
                                    </Button>
                                    <Dialog onClose={handleCloseSearchCourseDialog} open={openSearchCourseDialog}>
                                        <DialogTitle>Error</DialogTitle>
                                        <List sx={{pt: 0}}>
                                            <ListItem
                                                button
                                                onClick={handleCloseSearchCourseDialog}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar sx={{bgcolor: blue[100], color: blue[600]}}>
                                                        <PersonIcon/>
                                                    </Avatar>
                                                </ListItemAvatar>
                                            </ListItem>
                                            )
                                        </List>
                                    </Dialog>
                                    <Tooltip title="Reload">
                                        <IconButton>
                                            <RefreshIcon color="inherit" sx={{display: 'block'}}/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </Box>

                <Box component={"form"}
                     noValidate
                     onSubmit={handleEnroll}>
                    <Row sendToTableRow={courseList}/>
                    <Toolbar>
                        <Box
                            sx={{
                                '& .MuiTextField-root': {m: 0, width: '25ch'}, m: 1
                            }}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleEnroll}
                        >
                            {(type === "student") ? (
                                <Button type="submit"
                                        variant="contained"
                                        sx={{m: 1}}
                                        placement="right-start"
                                >
                                    Enroll Selected
                                </Button>) : null}
                        </Box>
                    </Toolbar>
                </Box>
            </Paper>
        </div>
    );
}


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
import Row from './TableRow';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {renewSearchedCourse} from '../dashboardSlice';

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

    let email = localStorage.getItem('myEmail')
    let password = localStorage.getItem('myPassword')
    let type = localStorage.getItem('myType')
    // let email = useSelector(state => state.contentsController.email)
    // let password = useSelector(state => state.contentsController.password)
    // let type = useSelector(state => state.contentsController.type)

    const [department, setDepartment] = React.useState('Empty');
    const [offeredTime, setOfferedTime] = React.useState('Empty');
    let enrollingCourse = useSelector(state => state.contentsController.enrollingCourse);
    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
    }
    const handleOfferedTimeChange = (event) => {
        setOfferedTime(event.target.value);
    }
    const handleSearchCourse = (event) => {
        event.preventDefault();

        const courseSearchForm = new FormData(event.currentTarget);
        console.log("handle search button");
        let data = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "department": courseSearchForm.get("department"),
            "semester": courseSearchForm.get("offered time"),
            // "title": courseSearchForm.get("course name"),
        })

        console.log(data);
        axios.post(server.host+'/get-courses',
            data,
            {headers: {'Content-Type': 'application/json'}})
            .then(function(response) {
                if(response.data.code === 1000){
                    console.log("Search course successfully!");
                    // console.log(courseListData);
                    dispatch(renewSearchedCourse(response.data.data));
                } else {
                    console.log(response.data.message);
                    dispatch(renewSearchedCourse([]));
                }
            });

    };

    const handleEnroll = (event) => {
        event.preventDefault();
        const courseSearchForm = new FormData(event.currentTarget);
        console.log("handle search button");
        console.log("enrollingCourse is ", enrollingCourse);
        console.log("length is :", enrollingCourse.length);

        // let code = enrollingCourse.get("code");
        console.log(enrollingCourse[0]);
        for (let i = 0; i < enrollingCourse.length; i++){
            let data = [];
            if(type === "instructor"){
                data = JSON.stringify({
                    "email": email,
                    "password": password,
                    "type": type,
                    "code": enrollingCourse[i]["code"],
                    "semester": enrollingCourse[i]["semester"],
                    "student_email": "Smith@test.com"
                })
                console.log("Enroll:", data);
            } else {
                data = JSON.stringify({
                    "email": email,
                    "password": password,
                    "type": type,
                    "code": enrollingCourse[i]["code"],
                    "semester": enrollingCourse[i]["semester"],
                })
            }

            axios.post(server.host + '/enroll-course',
                data,
                {headers: {'Content-Type': 'application/json'}})
                .then(function (response) {
                    if (response.data.code === 1000) {
                        console.log("Enroll course successfully!");
                        // dispatch(renewSearchedCourse(response.data.data));
                    } else {
                        console.log(response.data.message);
                        // dispatch(renewSearchedCourse([]));
                    }
                });
        };

    }

    const courseList = useSelector(state => state.contentsController.searchedCourse);

    return (
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
                                    // helperText="Please select your currency"
                                >
                                    {offeredTimes.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    fullWidth
                                    name="course name"
                                    placeholder="Search course by its name"
                                    InputProps={{
                                        disableUnderline: false,
                                        sx: {fontSize: '12px'},
                                    }}
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item>
                                <Button type="submit"
                                        variant="contained"
                                        sx={{mr: 1}}>
                                    Search Course
                                </Button>
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
                <Row sendToTableRow={courseList} ></Row>
                <Toolbar>
                    <Box
                        sx={{
                            '& .MuiTextField-root': { m: 0, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleEnroll}
                        sx={{m:1}}
                    >
                        <Button type="submit"
                                variant="contained"
                                sx={{m:1}}
                                placement="right-start"
                        >
                            Enroll Selected
                        </Button>
                    </Box>
                </Toolbar>
            </Box>
        </Paper>
    );
}


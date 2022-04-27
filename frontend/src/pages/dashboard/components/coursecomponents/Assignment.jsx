import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ListItemButton from "@mui/material/ListItemButton";
import {renewActiveComments, renewActivePost, renewAssignments} from "../../dashboardSlice";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import {Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {DesktopDateTimePicker, DesktopTimePicker} from "@mui/x-date-pickers";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";

// const assignments = [
//     {
//         id: 0,
//         title: "First assignment",
//         courseCode: "CSC 111",
//         starting_date: "Apr 26, 2022",
//         end_data: "Apr 28,2022",
//         file_path: "url_link",
//     },
//     {
//         id: 1,
//         title: "Second assignment",
//         courseCode: "CSC 111",
//         starting_date: "Apr 28, 2022",
//         end_data: "Apr 30,2022",
//         file_path: "url_link",
//     }
// ]

export default function Assignments() {

    const [isNewAssignment, setIsNewAssignment] = React.useState(false);
    const dispatch = useDispatch();
    let email = localStorage.getItem('myEmail')
    let password = localStorage.getItem('myPassword')
    let type = localStorage.getItem('myType')
    let courseID = useSelector(state => state.contentsController.activeCourse).id
    const server = useSelector(state => state.contentsController.server);
    const assignments = useSelector(state => state.contentsController.assignments);
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());

    const [hasUpdatedAssignment, setHasUpdatedAssignment] = React.useState(false);
    const [activeAssignment, setActiveAssignment] = React.useState(null);

    const handleNewAssignmentSubmit = (event) => {
        // console.log("handle post submit")
        event.preventDefault();
        const postCreationForm = new FormData(event.currentTarget);

        let assignment = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "courseID": courseID,
            "title": postCreationForm.get("title"),
            "content": postCreationForm.get("contents"),
            "filePath": postCreationForm.get("file path"),
            "startDate":startDate,
            "endDate":endDate,
        })
        console.log("assignment is : ", assignment);
        axios.post(server.host + '/create-assignment',
            assignment,
            {headers: {'Content-Type': 'application/json'}})
            .then(function (response) {
                console.log(response.data.message);
                if (response.data.code === 1000) {
                    getAssignments()
                }
            });
    }

    function getAssignments() {
        let getAssignments = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "courseID": courseID,

        })
        console.log("getAssignments is : ", getAssignments);
        axios.post(server.host + '/get-assignments',
            getAssignments,
            {headers: {'Content-Type': 'application/json'}})
            .then(function (response) {
                console.log("get assignments response is ", response.data);
                if (response.data.code === 1000) {
                    dispatch(renewAssignments(response.data.data));
                }
            });
    }

    if (!hasUpdatedAssignment) {
        getAssignments()
        setHasUpdatedAssignment(true)
    }

    const handleNewAssignmentClick = (event) => {
        event.preventDefault()
        setIsNewAssignment(true)
    }

    function handleAssignmentClick(assignmentID) {
        setIsNewAssignment(false)
        setActiveAssignment(assignments.filter(assignment =>
            (assignment.id === assignmentID)))

        console.log("active assignment is", activeAssignment)
    }

    const handleNewSubmissionSubmit = (event) => {
        console.log("handle new submit")
        event.preventDefault();
        const submissionCreationForm = new FormData(event.currentTarget);

        let newSubmission = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "courseID": courseID,
            "assignmentID":activeAssignment[0].id,
            "content": submissionCreationForm.get("submission"),
            "filePath": submissionCreationForm.get("file path"),
            "submitDate": new Date()
        })
        console.log("newSubmission is : ", newSubmission);
        axios.post(server.host + '/create-assignment-submission',
            newSubmission,
            {headers: {'Content-Type': 'application/json'}})
            .then(function (response) {
                console.log(response.data);
                if (response.data.code === 1000) {
                }
            });
    }

    return (
        <Grid container>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemButton disableGutters={true}
                                    padding={0}
                                    onClick={handleNewAssignmentClick}>
                        <ListItemAvatar>
                            <Avatar alt="N" src="/static/images/avatar/1.jpg"/>
                        </ListItemAvatar>
                        <ListItemText
                            primary="New Assignment"
                        />
                    </ListItemButton>
                </ListItem>
                {assignments.map( assignment =>(
                    <ListItem key={assignment.title}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <ListItemButton disableGutters={true}
                                        padding={0}
                                        xs={4}
                                        onClick={() => handleAssignmentClick(assignment.id)}>
                            <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                            </ListItemAvatar>
                                <ListItemText primary={assignment.title}
                                              secondary={
                                                  <div>
                                                      <div>{"Start: "+(new Date(assignment.startDate)).toString().substring(0,24)}</div>
                                                      <div>{"End: " + (new Date(assignment.endDate)).toString().substring(0,24)}</div>
                                                  </div>}
                                                  />
                        </ListItemButton>
                        </LocalizationProvider>
                    </ListItem>
                ))}
            </List>
            {isNewAssignment ? (
                <Grid xs={7} padding={3}>
                    <Divider orientation="vertical" flexItem/>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        onSubmit={handleNewAssignmentSubmit}
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
                            <Grid padding={1}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDateTimePicker
                                        label="Start time:"
                                        name="start time"
                                        value={startDate}
                                        minDate={new Date('2022-01-01')}
                                        onChange={(newValue) => {
                                            setStartDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid padding={1}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDateTimePicker
                                        label="End time:"
                                        name="end time"
                                        value={endDate}
                                        onChange={(endDate) => {
                                            setEndDate(endDate);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <TextField fullWidth
                                       variant="outlined"
                                       label="File path"
                                       name="file path"
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
            ):(null)}
            {(activeAssignment === null) ? (null):(
                <Grid sx={{ width: '70%', maxWidth: 500}}>
                    <Table aria-label="active assigment" >
                        <TableBody>
                            <TableRow key={activeAssignment[0].title}>
                                <TableCell component="th" scope="row">{"Title"}</TableCell>
                                <TableCell>{activeAssignment[0].title}</TableCell>
                            </TableRow>
                            <TableRow key={"content"}>
                                <TableCell component="th" scope="row">{"Content"}</TableCell>
                                <TableCell>{activeAssignment[0].content}</TableCell>
                            </TableRow>
                            <TableRow key={"File Path"}>
                                <TableCell component="th" scope="row">{"File Path"}</TableCell>
                                <TableCell>{activeAssignment[0].filePath}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Divider orientation="vertical" flexItem/>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        onSubmit={handleNewSubmissionSubmit}
                    >
                        <Grid m={1}>
                            <Grid>
                                New submission
                            </Grid>
                            <TextField multiline
                                       fullWidth
                                       rows={8}
                                       variant="outlined"
                                       label="Submission"
                                       name="submission"
                                       sx={{m: 1}}>
                            </TextField>
                            <TextField fullWidth
                                       variant="outlined"
                                       label="File path"
                                       name="file path"
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
            )}
        </Grid>
    );
}
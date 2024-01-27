import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Grid from "@mui/material/Grid";
import {useDispatch, useSelector} from "react-redux";
import {toCalendar} from "../../pages/DashboardSlice";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {TableCell} from "@mui/material";

export default function MenuListComposition() {

    const dispatch = useDispatch();
    const [isLeave, setIsLeave] = React.useState(false)
    const [isCourseDetail, setIsCourseDetail] = React.useState(false)
    const handleLeaveClick = (event) => {
        setIsCourseDetail(false)
        setIsLeave(true)
    }

    const email = localStorage.getItem('myEmail');
    const password = localStorage.getItem('myPassword');
    const type = localStorage.getItem('myType');
    const server = localStorage.getItem('myServer');
    const activeCourse = useSelector(state => state.contentsController.activeCourse)[0]

    const handleCourseDetailClick = (event) => {
        setIsCourseDetail(true)
        setIsLeave(false)
    }

    const handleDropCourse = (event) => {
        let dropCourse = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "courseID": activeCourse.id,
        })
        dispatch(toCalendar());
        axios.post(server + '/drop-course',
            dropCourse,
            {headers: {'Content-Type': 'application/json'}})
            .then(function (response) {
                if (response.data.code === 1000) {
                    setIsCourseDetail(true)
                    setIsLeave(false)
                }
            });
    }


    return (
        <Paper>
            <Grid container>
                <Grid item xs={4}>
                    <MenuList>
                        <MenuItem onClick={handleCourseDetailClick}> Course Details </MenuItem>
                        <MenuItem onClick={handleLeaveClick}>Drop</MenuItem>
                    </MenuList>
                </Grid>
                <Grid item xs={8}>
                    <MenuList>
                        {isCourseDetail ? (
                            <TableContainer>
                                <Table sx={{minWidth: 350}} size="small" aria-label="a dense table">
                                    <TableBody>
                                        <TableRow
                                            key={activeCourse.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell component="th" scope="row">Title</TableCell>
                                            <TableCell component="th" scope="row">{activeCourse.title}</TableCell>
                                        </TableRow>
                                        <TableRow key={"instructor name"}>
                                            <TableCell component="th" scope="row">Instructor</TableCell>
                                            <TableCell component="th"
                                                       scope="row">{activeCourse.instructorName}</TableCell>
                                        </TableRow>
                                        <TableRow key={"department"}>
                                            <TableCell component="th" scope="row">Department</TableCell>
                                            <TableCell component="th" scope="row">{activeCourse.department}</TableCell>
                                        </TableRow>
                                        <TableRow key={"semester"}>
                                            <TableCell component="th" scope="row">Semester</TableCell>
                                            <TableCell component="th" scope="row">{activeCourse.semester}</TableCell>
                                        </TableRow>
                                        <TableRow key={"location"}>
                                            <TableCell component="th" scope="row">Class Room</TableCell>
                                            <TableCell component="th" scope="row">{activeCourse.location}</TableCell>
                                        </TableRow>
                                        <TableRow key={"weekday"}>
                                            <TableCell component="th" scope="row">Days</TableCell>
                                            <TableCell component="th" scope="row">{activeCourse.weekday}</TableCell>
                                        </TableRow>
                                        <TableRow key={"start times"}>
                                            <TableCell component="th" scope="row">Start Times</TableCell>
                                            <TableCell component="th"
                                                       scope="row">{activeCourse.startTime.toString().substring(16, 21)}</TableCell>
                                        </TableRow>
                                        <TableRow key={"end times"}>
                                            <TableCell component="th" scope="row">End Times</TableCell>
                                            <TableCell component="th"
                                                       scope="row">{activeCourse.endTime.toString().substring(16, 21)}</TableCell>
                                        </TableRow>
                                        <TableRow key={"unit"}>
                                            <TableCell component="th" scope="row">Units</TableCell>
                                            <TableCell component="th" scope="row">{activeCourse.unit}</TableCell>
                                        </TableRow>
                                        <TableRow key={"seat"}>
                                            <TableCell component="th" scope="row">Capacity</TableCell>
                                            <TableCell component="th" scope="row">{activeCourse.seat}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (null)}
                        {isLeave ? (<MenuItem onClick={handleDropCourse}>Consent</MenuItem>) : (null)}
                    </MenuList>
                </Grid>
            </Grid>
        </Paper>
    )
}
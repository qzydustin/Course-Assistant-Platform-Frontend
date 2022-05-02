import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Checkbox from '@mui/material/Checkbox';
import {addEnrollCourse, removeEnrollCourse} from '../pages/DashboardSlice';
import {useDispatch} from "react-redux";
import Button from "@mui/material/Button";
import axios from "axios";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};


function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [hasChecked, setHasChecked] = React.useState(false);
    const [availability, setAvailability] = React.useState(0);

    const email = localStorage.getItem('myEmail')
    const password = localStorage.getItem('myPassword')
    const type = localStorage.getItem('myType')
    const server = localStorage.getItem('myServer');

    const handleCheckboxClick = (event) => {

        if(event.target.checked){
            let enrollCourse = JSON.stringify({
                "code": row.code,
                "semester": row.semester,
            });
            dispatch(addEnrollCourse(enrollCourse));
        } else {
            let removeCourse = JSON.stringify({
                "code": row.code,
                "semester": row.semester,
            });
            dispatch(removeEnrollCourse(removeCourse));
        }
    }

    const handleCheckAvailability = (event) => {
        let checkCourse = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "code": row.code,
            "semester": row.semester,
        })

        axios.post(server+'/get-course-enrolled-student-number',
            checkCourse,
            {headers: {'Content-Type': 'application/json'}})
            .then(function(response) {
                if(response.data.code === 1000){
                    setAvailability(row.seat - response.data.data);
                    setHasChecked(true);
                }
            });
    }
    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell> <Checkbox {...label} role = {row.code} onClick={handleCheckboxClick} /> </TableCell>
                <TableCell component="th" scope="row">{row.code}</TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{row.department}</TableCell>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 0}}>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    <TableRow key={row.instructorName}>
                                        <TableCell component="th" scope="row">{"Instructor"}</TableCell>
                                        <TableCell>{row.instructorName}</TableCell>
                                    </TableRow>
                                    <TableRow key={"unit"}>
                                        <TableCell component="th" scope="row">{"Unit"}</TableCell>
                                        <TableCell>{row.unit}</TableCell>
                                    </TableRow>
                                    <TableRow key={"seat"}>
                                        <TableCell component="th" scope="row">{"Capacity"}</TableCell>
                                        <TableCell>{row.seat}</TableCell>
                                    </TableRow>
                                    <TableRow key={"semester"}>
                                        <TableCell component="th" scope="row">{"Offered Time"}</TableCell>
                                        <TableCell>{row.semester}</TableCell>
                                    </TableRow>
                                    <TableRow key={"location"}>
                                        <TableCell component="th" scope="row">{"Class Room"}</TableCell>
                                        <TableCell>{row.location}</TableCell>
                                    </TableRow>
                                    <TableRow key={"weekday"}>
                                        <TableCell component="th" scope="row">{"Days"}</TableCell>
                                        <TableCell>{row.weekday}</TableCell>
                                    </TableRow>
                                    <TableRow key={"start time"}>
                                        <TableCell component="th" scope="row">{"Start Times"}</TableCell>
                                        <TableCell>{row.startTime.toString().substring(16, 21)}</TableCell>
                                    </TableRow>
                                    <TableRow key={"end time"}>
                                        <TableCell component="th" scope="row">{"End Times"}</TableCell>
                                        <TableCell>{row.endTime.toString().substring(16, 21)}</TableCell>
                                    </TableRow>
                                    <TableRow key={"availability"}>
                                        <TableCell component="th" scope="row">{"Availability"}</TableCell>
                                        {hasChecked ?
                                            (<TableCell>{availability}</TableCell>) :
                                            (<TableCell><Button
                                                onClick={handleCheckAvailability}>Check</Button></TableCell>)}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        code: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        department: PropTypes.string.isRequired,
        unit: PropTypes.number.isRequired,
        seat: PropTypes.number.isRequired,
        semester: PropTypes.string.isRequired,
        information: PropTypes.string.isRequired,
    }).isRequired,
};

export default function CollapsibleTable({sendToTableRow}) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>Course code</TableCell>
                        <TableCell align="left">Title</TableCell>
                        <TableCell align="left">Department</TableCell>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sendToTableRow.map((row, idx) => (
                        <Row key={idx} row={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
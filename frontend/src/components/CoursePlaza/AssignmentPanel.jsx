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
    renewActiveAssignment,
    renewAssignmentSubmission,
    toActiveAssignment,
    toChangeTab,
    toCreateAssignment
} from "../../pages/DashboardSlice";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";

export default function AssignmentPanel() {

    const dispatch = useDispatch();
    const assignments = useSelector(state => state.contentsController.assignments);
    const activeAssignment = useSelector(state => state.contentsController.activeAssignment);

    const email = localStorage.getItem('myEmail')
    const password = localStorage.getItem('myPassword')
    const type = localStorage.getItem('myType')
    const server = localStorage.getItem('myServer');

    const courseID = useSelector(state => state.contentsController.activeCourse)[0].id

    const handleNewAssignmentClick = () => {
        dispatch(toChangeTab(2))
        dispatch(toCreateAssignment())
    };

    async function handleAssignmentClick(assignmentID) {
        dispatch(toChangeTab(2))
        dispatch(toActiveAssignment())
        dispatch(renewActiveAssignment(assignments.filter(assignment =>
            (assignment.id === assignmentID))))
        getAssignmentSubmissions()

    }

    function getAssignmentSubmissions() {
        let getAssignmentsSubmissions = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "courseID": courseID,
            "assignmentID": activeAssignment[0].id,
        })
        axios.post(server + '/get-assignment-submissions',
            getAssignmentsSubmissions,
            {headers: {'Content-Type': 'application/json'}})
            .then(function (response) {
                if (response.data.code === 1000) {
                    dispatch(renewAssignmentSubmission(response.data.data));
                }
            });
    }

    return (
        <Accordion sx={{right: 5}} defaultExpanded={true}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel3a-content"
                id="panel3a-header"
            >

                <Typography>Assignment</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {(type === 'instructor') ? (
                        <IconButton size="small" sx={{mr: 1}} onClick={handleNewAssignmentClick}>
                            <AddIcon fontSize="inherit"/>
                            <div>New Assignment</div>
                        </IconButton>) : null}
                    {assignments.map((assignment) => (
                        <Grid>
                            <ListItem key={assignment.id}>
                                <ListItemButton disableGutters={true}
                                                padding={0}
                                                onClick={() => handleAssignmentClick(assignment.id)}>
                                    <ListItemAvatar>
                                        <FileCopyOutlinedIcon fontSize={"large"}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={assignment.title}
                                        secondary={
                                            <React.Fragment>
                                                {assignment.content}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItemButton>
                            </ListItem>
                            <Divider/>
                        </Grid>
                    ))}
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}

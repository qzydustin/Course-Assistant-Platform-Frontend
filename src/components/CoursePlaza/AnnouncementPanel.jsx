import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItemButton from "@mui/material/ListItemButton";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {renewActiveAnnouncements} from "../../pages/DashboardSlice";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function AnnouncementPanel() {
    const dispatch = useDispatch();
    const email = localStorage.getItem('myEmail')
    const password = localStorage.getItem('myPassword')
    const type = localStorage.getItem('myType')
    const server = localStorage.getItem('myServer');
    const courseID = useSelector(state => state.contentsController.activeCourse)[0].id;

    const [openAnnouncementID, setOpenAnnouncementID] = React.useState(0);
    const handleAnnouncementClose = () => {
        setOpenAnnouncementID(0);
    };

    function handleAnnouncementClick(announcementID) {
        setOpenAnnouncementID(announcementID);
    }

    const [openNew, setNewOpen] = React.useState(false);

    const handleNewAnnouncementClickOpen = () => {
        setNewOpen(true);
    };

    const handleNewAnnouncementClose = () => {
        setNewOpen(false);
    };
    const announcements = useSelector(state => state.contentsController.activeAnnouncement)

    const handleCreateAnnouncement = (event) => {
        event.preventDefault();
        setNewOpen(false);
        const announcementCreationForm = new FormData(event.currentTarget);

        let creatAnnouncement = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "courseID": courseID,
            "title": announcementCreationForm.get("title"),
            "content": announcementCreationForm.get("content")
        })
        axios.post(server + '/create-announcement',
            creatAnnouncement,
            {headers: {'Content-Type': 'application/json'}})
            .then(function (response) {
                if (response.data.code === 1000) {

                    axios.post(server + '/get-announcements',
                        creatAnnouncement,
                        {headers: {'Content-Type': 'application/json'}})
                        .then(function (response) {
                            if (response.data.code === 1000) {
                                dispatch(renewActiveAnnouncements(response.data.data))
                            }
                        })
                }
            })
    }

    return (
        <Accordion sx={{right: 5}} defaultExpanded={true}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Grid item xs>
                    Announcement
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        {(type === 'instructor') ? (
                            <IconButton size="small" sx={{mr: 1}} onClick={handleNewAnnouncementClickOpen}>
                                <AddIcon fontSize="inherit"/>
                                <div>New Announcement</div>
                            </IconButton>) : null}
                        <Dialog open={openNew} onClose={handleNewAnnouncementClose}>
                            <Box
                                component="form"
                                noValidate
                                autoComplete="off"
                                onSubmit={handleCreateAnnouncement}
                            >
                                <DialogTitle>New Announcement</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="title"
                                        label="Title"
                                        type="Title"
                                        name="title"
                                        fullWidth
                                        variant="outlined"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="content"
                                        label="Contents"
                                        name="content"
                                        type="content"
                                        fullWidth
                                        variant="outlined"
                                        multiline
                                        rows={8}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleNewAnnouncementClose}>Cancel</Button>
                                    <Button type="submit">Publish</Button>
                                </DialogActions>
                            </Box>
                        </Dialog>
                    </Grid>
                    <List sx={{width: '100%', maxWidth: 360}}>
                        {announcements.map(announcement => (
                            <Grid key={announcement.id}>
                                <ListItem alignItems="flex-start">
                                    <ListItemButton padding={0}
                                                    onClick={() => handleAnnouncementClick(announcement.id)}>
                                        <ListItemText
                                            primary={announcement.title}
                                            secondary={
                                                <React.Fragment>
                                                    {announcement.content}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItemButton>
                                    <BootstrapDialog
                                        onClose={handleAnnouncementClose}
                                        aria-labelledby="customized-dialog-title"
                                        open={openAnnouncementID === announcement.id}
                                    >
                                        <BootstrapDialogTitle id="customized-dialog-title"
                                                              onClose={handleAnnouncementClose}>
                                            {announcement.title}
                                        </BootstrapDialogTitle>
                                        <DialogContent dividers>
                                            <Typography gutterBottom>
                                                {announcement.content}
                                            </Typography>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button autoFocus onClick={handleAnnouncementClose}>
                                                OK
                                            </Button>
                                        </DialogActions>
                                    </BootstrapDialog>
                                </ListItem>
                                <Divider component="li"/>
                            </Grid>
                        ))}
                    </List>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}
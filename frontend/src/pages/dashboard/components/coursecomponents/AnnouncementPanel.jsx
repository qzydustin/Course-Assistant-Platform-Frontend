import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
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
import {useSelector} from "react-redux";
import Grid from "@mui/material/Grid";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
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
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function AlignItemsList() {

    const [openID, setOpenID] = React.useState(0);

    const handleClose = () => {
        setOpenID(0);
    };

    function handleAnnouncementClick(announcementID){
        setOpenID(announcementID);
    }

    const announcements = useSelector(state => state.contentsController.activeAnnouncement)

    return (
        <List sx={{ width: '100%', maxWidth: 360}}>
            <Divider component="li" />
            {announcements.map( announcement =>(
                <Grid key={announcement.id}>
                    <ListItem alignItems="flex-start">
                        <ListItemButton padding={0} onClick={() => handleAnnouncementClick(announcement.id)}>
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
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={openID === announcement.id}
                        >
                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                                {announcement.title}
                            </BootstrapDialogTitle>
                            <DialogContent dividers>
                                <Typography gutterBottom>
                                    {announcement.content}
                                </Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose}>
                                    OK
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>
                    </ListItem>
                    <Divider component="li" />
                </Grid>
            ))}

        </List>
    );
}
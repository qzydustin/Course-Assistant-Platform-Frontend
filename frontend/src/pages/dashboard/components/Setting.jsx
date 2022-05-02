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
import {renewPosts, saveEmail, savePassword, saveType, toFrontPage} from "../dashboardSlice";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function MenuListComposition(){

    const dispatch = useDispatch();
    const [isLeave, setIsLeave] = React.useState(false)
    const handleLeaveClick = (event) => {
        setIsMyAccount(false)
        setIsLeave(true)
    }
    const [isMyAccount, setIsMyAccount] = React.useState(false)
    const handleMyAccountClick = (event) => {
        setIsMyAccount(true)
        setIsLeave(false)
    }

    const email = localStorage.getItem('myEmail')
    const type = localStorage.getItem('myType');
    const server = localStorage.getItem('myServer');
    // const courseID = useSelector(state => state.contentsController.activeCourse)[0].id


    const handleUpdatePassword = (event) => {
        event.preventDefault();
        const loginForm = new FormData(event.currentTarget);

        dispatch(savePassword(loginForm.get("password")));

        let data = JSON.stringify({
            "email": email,
            "password": loginForm.get("password"),
            "type": type,
            "newPassword": loginForm.get("new password"),
        })

        console.log("Update data is ",data);

        axios.post(server+'/update-password',
            data,
            {headers: {'Content-Type': 'application/json'}})
            .then(function(response) {
                if(response.data.code === 1000){
                    console.log("Update password successfully!", response);
                    localStorage.setItem('myPassword', loginForm.get("new password"));
                } else {
                    console.log(response.data.message);
                }
            });
    };

    const handleUpdateUsername = (event) => {
        event.preventDefault();
        const loginForm = new FormData(event.currentTarget);

        dispatch(saveType(loginForm.get('role-group-label')));


        let data = JSON.stringify({
            "email": email,
            "password": loginForm.get("password"),
            "type": type,
            "newUsername": loginForm.get("new username"),
        })

        console.log("Update data is ",data);

        axios.post(server+'/update-username',
            data,
            {headers: {'Content-Type': 'application/json'}})
            .then(function(response) {
                if(response.data.code === 1000){
                    console.log("Update username successfully!", response);
                    localStorage.setItem('myUserName', loginForm.get("new username"));
                } else {
                    console.log(response.data.message);
                }
            });
    };

    return (
        <Paper>
            <Grid container>
                <Grid item xs={4}>
                    <MenuList>
                        <MenuItem>Course Details</MenuItem>
                        <MenuItem onClick={handleMyAccountClick}>My account</MenuItem>
                        <MenuItem onClick={handleLeaveClick}>Leave</MenuItem>
                    </MenuList>
                </Grid>
                <Grid item xs={8}>
                    <MenuList>
                        {/*<MenuItem>Profile</MenuItem>*/}
                        {isMyAccount? (
                            <Grid container>
                                <Grid item>
                                    <Box
                                        component="form"
                                        noValidate
                                        onSubmit={handleUpdatePassword}
                                        sx={{m: 2}}
                                    >
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Current Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="new password"
                                            label="New Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{mt: 3, mb: 2}}
                                        >
                                            Update My Password
                                        </Button>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box
                                        component="form"
                                        noValidate
                                        onSubmit={handleUpdateUsername}
                                        sx={{m: 2}}
                                    >
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="new username"
                                            label="New Username"
                                            type="new username"
                                            id="new username"
                                            autoComplete="new-username"
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Current Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                        />

                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{mt: 3, mb: 2}}
                                        >
                                            Update My Username
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                            ):(null)}
                        {isLeave? (<MenuItem>Drop Course</MenuItem>):(null)}
                    </MenuList>
                </Grid>
            </Grid>
        </Paper>
    )
}
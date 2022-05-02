import * as React from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Grid from "@mui/material/Grid";
import {useDispatch} from "react-redux";
import {savePassword, saveType, saveUserName} from "../pages/DashboardSlice";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CapAlert from "./CapAlert";

export default function MenuListComposition() {

    const dispatch = useDispatch();

    const [isMyAccount, setIsMyAccount] = React.useState(true)
    const handleMyAccountClick = (event) => {
        setIsMyAccount(true)
    }
    const [alert, setAlert] = React.useState({
        message: "",
        type: null
    })
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

        axios.post(server+'/update-password',
            data,
            {headers: {'Content-Type': 'application/json'}})
            .then(function(response) {
                if (response.data.code === 1000) {

                    setAlert({message: response.data.message, type: "success"})
                    localStorage.setItem('myPassword', response.data.data.password);
                } else {
                    setAlert({message: response.data.message, type: "error"})
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


        axios.post(server + '/update-username',
            data,
            {headers: {'Content-Type': 'application/json'}})
            .then(function (response) {
                if (response.data.code === 1000) {
                    setAlert({message: response.data.message, type: "success"})
                    localStorage.setItem('myUserName', loginForm.get("new username"));
                } else {
                    setAlert({message: response.data.message, type: "error"})
                }
            });
        dispatch(saveUserName(loginForm.get("new username")))
    };

    return (
        <div>
            <Grid item xs={12} mb={2}>
                <CapAlert message={alert.message} type={alert.type}/>
            </Grid>
        <Paper>
            <Grid container>
                <Grid item xs={2}>
                    <MenuList>
                        <MenuItem onClick={handleMyAccountClick}>My account</MenuItem>
                    </MenuList>
                </Grid>
                <Grid item xs={8}>

                    <MenuList>
                        {isMyAccount ? (
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
                    </MenuList>
                </Grid>
            </Grid>
        </Paper>
        </div>
    )
}
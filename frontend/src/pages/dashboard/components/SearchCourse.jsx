import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import axios from "axios";

export default function Content() {

    const handleSubmit = (event) => {
        event.preventDefault();
        // const loginForm = new FormData(event.currentTarget);
        //
        //
        // let data = JSON.stringify({
        //     "email": loginForm.get("email"),
        //     "password": loginForm.get("password"),
        //     "type": loginForm.get('role-group-label')
        // })
        //
        // // console.log(data);
        //
        //
        // axios.post('http://127.0.0.1:8080/login',
        //     data,
        //     {headers: {'Content-Type': 'application/json'}})
        //     .then(function(response) {
        //         if(response.data === 200){
        //             console.log("Log in success!");
        //             toDashboard = true;
        //             navigate('/dashboard');
        //             // window.moveTo("/dashboard");
        //         } else if(response.data === 400){
        //             console.log("Cannot log in.");
        //         }
        //     });


        // console.log(res);
    };

    return (
        <Paper sx={{maxWidth: 936, margin: 'auto', overflow: 'hidden'}}>
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
                                fullWidth
                                placeholder="Search by email address, phone number, or user UID"
                                InputProps={{
                                    disableUnderline: true,
                                    sx: {fontSize: 'default'},
                                }}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" sx={{mr: 1}}>
                                Add user
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
            <Typography sx={{my: 5, mx: 2}} color="text.secondary" align="center">
                The is the search box for Course
            </Typography>
            <Box
                component="CourseSelectionForm"
                sx={{'& .MuiTextField-root': { m: 2, width: '20ch' },}}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div>
                    <TextField
                        error
                        id="filled-error"
                        label="Error"
                        defaultValue="Hello World"
                        variant="filled"
                    />
                    <TextField
                        error
                        id="filled-error-helper-text"
                        label="Error"
                        defaultValue="Hello World"
                        helperText="Incorrect entry."
                        variant="filled"
                    />
                    <Grid item>
                        <Button variant="contained" sx={{mb: 2, float: "right",mr: 2}}>
                            Add user
                        </Button>
                    </Grid>
                </div>

            </Box>

        </Paper>
    );
}

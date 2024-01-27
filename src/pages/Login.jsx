import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

import {saveEmail, savePassword, saveType} from "./DashboardSlice";
import {useDispatch} from "react-redux";

import CapAlert from "../components/CapAlert";


const theme = createTheme();

export default function Login({server}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [alert, setAlert] = React.useState({
        message:"",
        type:null
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        const loginForm = new FormData(event.currentTarget);

        dispatch(saveEmail(loginForm.get("email")));
        dispatch(savePassword(loginForm.get("password")));
        dispatch(saveType(loginForm.get('role-group-label')));


        let login = JSON.stringify({
            "email": loginForm.get("email"),
            "password": loginForm.get("password"),
            "type": loginForm.get('role-group-label'),
        })

        server = localStorage.getItem("myServer");

        axios.post(server+'/login',
            login,
            {headers: {'Content-Type': 'application/json'}})
            .then(function(response) {
                if(response.data.code === 1000){

                    setAlert({message:response.data.message+" Redirecting...", type:"success"})

                    localStorage.setItem('myEmail', response.data.data.email);
                    localStorage.setItem('myPassword', response.data.data.password);
                    localStorage.setItem('myType', response.data.data.type);
                    localStorage.setItem('myUserName', response.data.data.username);

                    navigate('/dashboard');
                } else {
                    setAlert({message:response.data.message, type:"error"})
                }
        });

    };



    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: "100vh"}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: "url(https://source.unsplash.com/random/?university)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Course Assistant Platform
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{mt: 1}}
                        >
                            <Grid container>
                                <Grid item xs={12}>
                                    <CapAlert message={alert.message} type={alert.type}/>
                                </Grid>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <Grid item
                                      display="flex"
                                      justifyContent="center">
                                    <RadioGroup
                                        row
                                        aria-labelledby="role-group-label"
                                        defaultValue="student"
                                        name="role-group-label"
                                    >
                                        <FormControlLabel
                                            value="student"
                                            control={<Radio/>}
                                            label="Student"
                                        />
                                        <FormControlLabel
                                            value="instructor"
                                            control={<Radio/>}
                                            label="Instructor"
                                        />
                                    </RadioGroup>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Sign In
                                </Button>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up "}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

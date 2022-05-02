import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";

const theme = createTheme();

export default function SignUp({server}) {
    let navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const signUpForm = new FormData(event.currentTarget);

        let data = JSON.stringify({
            "email": signUpForm.get("email"),
            "username": signUpForm.get("username"),
            "password": signUpForm.get("password"),
            "type": signUpForm.get('role-group-label')
        })


        axios.post(server.host+'/signup', data, {headers: {'Content-Type': 'application/json'}}).then((response) => {
            if(response.data.code === 1000){
                console.log("Sign up suceessfully!");
                navigate('/login');
            } else {
                console.log(response.data.message)
            }
        });
    };



    const [openSignupDialog, setOpenSignupDialog] = React.useState(false)

    const handleCloseSignupDialog = (event) =>{
        setOpenSignupDialog(false)
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                        <LockOutlinedIcon/>
                    </Avatar>{" "}
                    <Typography component="h1" variant="h5">
                        Sign up{" "}
                    </Typography>{" "}
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{mt: 3}}
                    >
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>{" "}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>{" "}
                            <Grid item xs={12}>
                                <FormControl>
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
                                </FormControl>
                            </Grid>{" "}
                        </Grid>{" "}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up{" "}
                        </Button>{" "}
                        <Dialog onClose={handleCloseSignupDialog} open={openSignupDialog}>
                                <DialogTitle>Error</DialogTitle>
                                <List sx={{ pt: 0 }}>
                                    
                                    <ListItem
                                        button
                                        onClick={handleCloseSignupDialog}
                                    >
                                        <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                            <PersonIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                    </ListItem>
                                    )
                                </List>
                            </Dialog>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account ? Log in
                                </Link>{" "}
                            </Grid>{" "}
                        </Grid>{" "}
                    </Box>{" "}
                </Box>{" "}
            </Container>{" "}
        </ThemeProvider>
    );
}


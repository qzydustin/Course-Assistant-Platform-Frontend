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

const theme = createTheme();

export default function SignUp() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const signUpForm = new FormData(event.currentTarget);

        let data = JSON.stringify({
            "email": signUpForm.get("email"),
            "username": signUpForm.get("username"),
            "password": signUpForm.get("password"),
            "type": signUpForm.get('role-group-label')
        })
        // console.log(data);

        axios.post('http://127.0.0.1:8080/signup', data, {headers: {'Content-Type': 'application/json'}}).then((response) => {
            console.log(response);
        });
    };

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
                                        defaultValue="Student"
                                        name="role-group-label"
                                    >
                                        <FormControlLabel
                                            value="Student"
                                            control={<Radio/>}
                                            label="Student"
                                        />
                                        <FormControlLabel
                                            value="Instructor"
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

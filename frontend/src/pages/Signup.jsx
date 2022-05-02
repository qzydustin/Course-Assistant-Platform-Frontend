import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import CapAlert from "../components/CapAlert";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
const theme = createTheme();

export default function Signup({server}) {
    const navigate = useNavigate();

    const [alert, setAlert] = React.useState({
        message:"",
        type:null
    })

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
                setAlert({message:response.data.message+" Redirecting...", type:"success"})
                navigate('/login');
            } else {
                setAlert({message:response.data.message, type:"error"})
            }
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
                    <Avatar sx={{m: 1, backgroundColor: "secondary.main"}}>
                        <AccountBoxOutlinedIcon/>
                    </Avatar> 
                    <Typography component="h1" variant="h5">
                        Sign up 
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{mt: 3}}
                    >
                        <Grid container spacing={1} >
                            <Grid item xs={12}>
                                <CapAlert message={alert.message} type={alert.type}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                />
                            </Grid>
                            <Grid item xs={12}
                                  display="flex"
                                  justifyContent="center"
                            >
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
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up 
                        </Button> 
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account ? Log in
                                </Link> 
                            </Grid> 
                        </Grid> 
                    </Box> 
                </Box> 
            </Container> 
        </ThemeProvider>
    );
}


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Row from './TableRow';

const offeredTimes = [
    {value: '2022-spring', label: '2022 Spring',},
    {value: '2022-2', label: '2022 Summer',},
    {value: '2022-3', label: '2022 Fall',},
    {value: '2022-4', label: '2022 Winter',},
];


export default function Content() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const courseSearchForm = new FormData(event.currentTarget);

        console.log("handle search button");
        let data = JSON.stringify({
            "Course ID": courseSearchForm.get("Course ID"),
            "Course name": courseSearchForm.get("Course Name"),
            "Offered Time": courseSearchForm.get("Offered Time"),
        })
        //
        console.log(data);
        console.log(event.target[1].value)
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

    const [offeredTime, setOfferedTime] = React.useState('2022-spring');

    const handleOfferedTimeChange = (event) => {
        setOfferedTime(event.target.value);
    }

    return (
        <Paper sx={{maxWidth: 936, margin: 'auto', overflow: 'hidden'}}>
            <Box
                component="form"
                sx={{'& .MuiTextField-root': {m: 1.5, width: '20ch'},}}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
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
                                    id="Offered Time"
                                    select
                                    name="Offered Time"
                                    label="Offered Time"
                                    value={offeredTime}
                                    onChange={handleOfferedTimeChange}
                                    // helperText="Please select your currency"
                                >
                                    {offeredTimes.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="Offered Time"
                                    select
                                    name="Offered Time"
                                    label="Offered Time"
                                    value={offeredTime}
                                    onChange={handleOfferedTimeChange}
                                    // helperText="Please select your currency"
                                >
                                    {offeredTimes.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    fullWidth
                                    name="Course Name"
                                    placeholder="Search course by its name"
                                    InputProps={{
                                        disableUnderline: false,
                                        sx: {fontSize: '12px'},
                                    }}
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item>
                                <Button type="submit"
                                        variant="contained"
                                        sx={{mr: 1}}>
                                    Search Course
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
                    {/*<Grid item xs>*/}
                    {/*    <TextField*/}
                    {/*        error*/}
                    {/*        name="Course Name"*/}
                    {/*        label="Course Name"*/}
                    {/*        defaultValue="Text Field 2"*/}
                    {/*        helperText="Incorrect entry."*/}
                    {/*        variant="standard"*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                <Row></Row>
            </Box>
        </Paper>
    );
}


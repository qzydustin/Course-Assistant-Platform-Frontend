import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import axios from "axios";
import {useSelector} from "react-redux";


const departments = [
    {value: 'Empty', label: ''},
    {value: 'computer science', label: 'Computer Science',},
    {value: 'Engineering', label: 'Engineering',},
    {value: 'Mathematics', label: 'Mathematics',},
];

const offeredTimes = [
    {value: 'Empty', label: ''},
    {value: '2022 spring', label: '2022 Spring',},
    {value: '2022 summer', label: '2022 Summer',},
    {value: '2022 fall', label: '2022 Fall',},
    {value: '2022 winter', label: '2022 Winter',},
];


export default function MultilineTextFields() {

    let email = useSelector(state => state.contentsController.email)
    let password = useSelector(state => state.contentsController.password)
    let type = useSelector(state => state.contentsController.type)

    const handleSubmit = (event) => {
        event.preventDefault();
        const createCourseForm = new FormData(event.currentTarget);

        console.log("handle create course button");

        let data = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "code": createCourseForm.get("course id"),
            "title": createCourseForm.get("course name"),
            "seat": createCourseForm.get("availability"),
            "unit": createCourseForm.get("units"),
            "department": createCourseForm.get("department"),
            "semester": createCourseForm.get("offered time"),
            "information": createCourseForm.get("description"),
        })

        console.log(data);
        axios.post('http://127.0.0.1:8080/add-course',
            data,
            {headers: {'Content-Type': 'application/json'}})
            .then(function(response) {
                if(response.data.code === 1000){
                    console.log("Add course successfully!");
                } else {
                    console.log(response.data.message);
                }
            });
    };

    const [department, setDepartment] = React.useState('');
    const [offeredTime, setOfferedTime] = React.useState('');


    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
    }
    const handleOfferedTimeChange = (event) => {
        setOfferedTime(event.target.value);
    }

    return (
      <Paper sx={{maxWidth: 936, margin: 'auto', overflow: 'hidden'}}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{ml:4,mt:2,gap:2}}
        >
          <Box>
            <TextField
              id="standard-textarea"
              label="Course Name"
              name="course name"
              placeholder="Placeholder"
              multiline
              variant="standard"
              sx={{m:2}}
            />
            <TextField
              id="standard-textarea"
              label="Course ID"
              name="course id"
              placeholder="Placeholder"
              multiline
              variant="standard"
              sx={{m:2}}
            />
            <TextField
              id="standard-textarea"
              label="Availability"
              name="availability"
              placeholder="Placeholder"
              multiline
              variant="standard"
              sx={{m:2}}
            />
            <TextField
              id="standard-textarea"
              label="Units"
              name="units"
              placeholder="Placeholder"
              multiline
              variant="standard"
              sx={{m:2}}
            />
          </Box>
          <div>
            <TextField
              id="standard-select-currency"
              select
              label="Department"
              name="department"
              value={department}
              onChange={handleDepartmentChange}
              helperText="Please select your department"
              variant="standard"
              sx={{m:2}}
            >
              {departments.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="standard-select-currency"
              select
              label="Offered Time"
              name="offered time"
              value={offeredTime}
              onChange={handleOfferedTimeChange}
              helperText="Please select your offered time"
              variant="standard"
              sx={{m:2}}
            >
              {offeredTimes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                      {option.label}
                  </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              id="standard-multiline-static"
              label="Description"
              name="description"
              multiline
              rows={4}
              variant="standard"
              sx={{m:2}}
            />
          </div>
            <Toolbar>
                <Grid item>
                    <Button type="submit"
                            variant="contained"
                            sx={{m:2}}
                            placement="right-start">
                        Create Course
                    </Button>
                </Grid>
            </Toolbar>
        </Box>
      </Paper>
    );
}
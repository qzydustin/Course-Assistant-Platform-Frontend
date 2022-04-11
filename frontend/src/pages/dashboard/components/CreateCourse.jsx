import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';


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

    const handleSubmit = (event) => {
        event.preventDefault();
        const createCourseForm = new FormData(event.currentTarget);

        console.log("handle create course button");
        // let data = JSON.stringify({
        //     "Course ID": courseSearchForm.get("Course ID"),
        //     "Course name": courseSearchForm.get("Course Name"),
        //     "Offered Time": courseSearchForm.get("Offered Time"),
        // })
        let data = JSON.stringify({
            "email": "teststudent@qq.com",
            "password": "123123",
            "type": "instructor",
            "course id": createCourseForm.get("course id"),
            "course name": createCourseForm.get("course name"),
            "availability": createCourseForm.get("availability"),
            "units": createCourseForm.get("units"),
            "department": createCourseForm.get("department"),
            "semester": createCourseForm.get("offered time"),
            "description": createCourseForm.get("description"),
        })

        console.log(data);
        // axios.post('http://127.0.0.1:8080/login',
        //     data,
        //     {headers: {'SearchCourse-Type': 'application/json'}})
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

  const [value, setValue] = React.useState('Controlled');
  // const [currency, setCurrency] = React.useState('EUR');
  const [department, setDepartment] = React.useState('');
  const [offeredTime, setOfferedTime] = React.useState('');


    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
    }
    const handleOfferedTimeChange = (event) => {
        setOfferedTime(event.target.value);
    }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
      <TextField
          id="standard-textarea"
          label="Course Name"
          name="course name"
          placeholder="Placeholder"
          multiline
          variant="standard"
        />
        <TextField
          id="standard-textarea"
          label="Course ID"
          name="course id"
          placeholder="Placeholder"
          multiline
          variant="standard"
        />
        <TextField
          id="standard-textarea"
          label="Availability"
          name="availability"
          placeholder="Placeholder"
          multiline
          variant="standard"
        />
        <TextField
          id="standard-textarea"
          label="Units"
          name="units"
          placeholder="Placeholder"
          multiline
          variant="standard"
        />
      </div>
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
        />
      </div>
        <Grid item>
            <Button type="submit"
                    variant="contained"
                    sx={{mr: 1}}>
                Create Course
            </Button>
        </Grid>
    </Box>
  );
}
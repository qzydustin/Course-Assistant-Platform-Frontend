import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];



export default function MultilineTextFields() {
  const [value, setValue] = React.useState('Controlled');
  const [currency, setCurrency] = React.useState('EUR');


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      <TextField
          id="standard-textarea"
          label="Course Name"
          placeholder="Placeholder"
          multiline
          variant="standard"
        />
        <TextField
          id="standard-textarea"
          label="Course ID"
          placeholder="Placeholder"
          multiline
          variant="standard"
        />
        <TextField
          id="standard-textarea"
          label="Availability"
          placeholder="Placeholder"
          multiline
          variant="standard"
        />
        <TextField
          id="standard-textarea"
          label="Units"
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
          value={currency}
          onChange={handleChange}
          helperText="Please select your department"
          variant="standard"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-select-currency-native"
          select
          label="Offered Time"
          value={currency}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          helperText="Please select offered time"
          variant="standard"
        >
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        </div>

        <div>
        <TextField
          id="standard-multiline-static"
          label="Description"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="standard"
        />
      </div>
    </Box>
  );
}
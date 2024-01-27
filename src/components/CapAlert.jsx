import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

export default function CapAlert(props) {
    const message = props.message;
    const type = props.type

    if (type === null)
        return null
    else {
        return (
            <Box sx={{}}>
                <Collapse in={true}>
                    <Alert variant="outlined"
                           severity={type}>
                        {message}
                    </Alert>
                </Collapse>
            </Box>
        );
    }
}
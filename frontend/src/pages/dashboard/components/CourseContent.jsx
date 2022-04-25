import * as React from 'react';
import Grid from '@mui/material/Grid';
import {useSelector} from "react-redux";
import Discussion from './coursecomponents/Discussion';

export default function CourseContent() {

    const activeTab = useSelector(state => state.contentsController.activeTab);
    console.log("activeTab is ", activeTab);

    return (
        <Grid container>
            {(activeTab === 1) ? (
                <Grid>
                        <Discussion/>
                </Grid>) : null}
        </Grid>
    );
}

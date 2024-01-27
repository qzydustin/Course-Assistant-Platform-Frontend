import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {toChangeTab} from "../pages/DashboardSlice";

export default function TabBar() {

    const tabValue = useSelector(state => state.contentsController.activeTab)
    const dispatch = useDispatch();

    const handleTabChange = (event, newValue) => {
        dispatch(toChangeTab(newValue));
    };
    return (
        <AppBar component="div" position="static" elevation={0} sx={{zIndex: 0}}>
            <Tabs value={tabValue} textColor="inherit" onChange={handleTabChange}>
                <Tab label="Main"/>
                <Tab label="Discussion"/>
                <Tab label="Assignment"/>
                <Tab label="Management"/>
            </Tabs>
        </AppBar>
    )
}
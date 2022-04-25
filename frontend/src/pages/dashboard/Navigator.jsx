import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import NotesIcon from '@mui/icons-material/Notes';

import {useDispatch, useSelector} from 'react-redux';
import { toFrontPage, toSwitch1, toCreateCourse, toCourseEnroll, toActiveCourse } from './dashboardSlice';


const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  let enrolledCourse = useSelector(state => state.contentsController.enrolledCourse);

  let categories = [
    {
      id: 'Build',
      children: [
        { id: 'Front page', icon: <PeopleIcon />, active: "Front Page",},
        { id: 'Switch 1', icon: <DnsRoundedIcon /> , active: "Switch 1"},
        { id: 'Switch 2', icon: <PermMediaOutlinedIcon /> , active: "Switch 2"},
        { id: 'Switch 3', icon: <PublicIcon /> , active: "Switch 3"},
        { id: 'Switch 4', icon: <SettingsEthernetIcon /> , active: "Switch 4"},
        { id: 'Machine learning', icon: <SettingsInputComponentIcon />, active: "Machine learning"},
      ],
    },
    {
      id: 'Course Plaza',
      children: enrolledCourse.map( course => ({ id: course.code, icon:<NotesIcon/>, active: course.code, semester:course.semester})),
    },
    {
      id: 'Management',
      children: [
        { id: 'Create Course', icon: <TimerIcon />, active: "Create Course"},
        { id: 'Course Enroll', icon: <SettingsIcon />, active: "Course Enroll"},
        { id: 'Performance', icon: <TimerIcon />, active: "Performance"},
        { id: 'Test Lab', icon: <PhonelinkSetupIcon />, active: "Test Lab"},
      ],
    },
  ];

  const { ...other } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(true);

  const handleNonCourseListClick = (event, active) => {
    setSelectedIndex(active);
    console.log("active=",active);
    dispatch(toActiveCourse(''));
    if (active === "Front Page") dispatch(toFrontPage());
    if (active === "Switch 1") dispatch(toSwitch1());
    if (active === "Create Course") dispatch(toCreateCourse());
    if (active === "Course Enroll") dispatch(toCourseEnroll());
  };

  const handleCourseListClick = (event, active, semester) => {
    setSelectedIndex(active);
    console.log("active=",active);

    let activeCourse = JSON.stringify({
      "code": active,
      "semester": semester,
    })
    dispatch(toActiveCourse(activeCourse));
  };

  const activeCourse = useSelector(state => state.contentsController.activeCourse)
  // console.log("activeCourse is ", activeCourse);

  return (
    <Drawer variant="permanent" {...other}>
      {/*<Drawer variant="permanent">*/}
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          Home page header
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Home Icon</ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {id === 'Course Plaza' ? (
                children.map(({ id: childId, icon, active, semester}) => (
                    <ListItem disablePadding key={childId}>
                    <ListItemButton selected={selectedIndex === active}
                                    sx={item}
                                    onClick={(event) => handleCourseListClick(event, active, semester)}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText>{childId}</ListItemText>
                    </ListItemButton>
                    </ListItem>))):(
                children.map(({ id: childId, icon, active}) => (
                    <ListItem disablePadding key={childId}>
                    <ListItemButton selected={selectedIndex === active}
                                    sx={item}
                                    onClick={(event) => handleNonCourseListClick(event, active)}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{childId}</ListItemText>
                    </ListItemButton>
                    </ListItem>)))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}

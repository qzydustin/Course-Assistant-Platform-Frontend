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


import { useDispatch } from 'react-redux';
import { toFrontPage, toSwitch1 } from './dashboardSlice';

const categories = [
  {
    id: 'Build',
    children: [
      { id: 'Front page', icon: <PeopleIcon />, active: 0,},
      { id: 'Switch 1', icon: <DnsRoundedIcon /> , active: 1},
      { id: 'Switch 2', icon: <PermMediaOutlinedIcon /> , active: 2},
      { id: 'Switch 3', icon: <PublicIcon /> , active: 3},
      { id: 'Switch 4', icon: <SettingsEthernetIcon /> , active: 4},
      { id: 'Machine learning', icon: <SettingsInputComponentIcon />, active: 5},
    ],
  },
  {
    id: 'Course Plaza',
    children: [
      { id: 'Course_1', icon: <SettingsIcon />, active: 10},
      { id: 'Course_2', icon: <TimerIcon />, active: 11},
      { id: 'Course_3', icon: <PhonelinkSetupIcon />, active: 12},
    ],
  },
  {
    id: 'Management',
    children: [
      { id: 'Course Enroll', icon: <SettingsIcon />, active: 20},
      { id: 'Performance', icon: <TimerIcon />, active: 21},
      { id: 'Test Lab', icon: <PhonelinkSetupIcon />, active: 22},
    ],
  },
];



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
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { ...other } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(true);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    console.log("index=",index);
    if (index < 10){
      navigate('/dashboard');
      if (index === 0){
        dispatch(toFrontPage());
      }
      if (index === 1){
        dispatch(toSwitch1());
      }
    } else if (index < 20){
      navigate('/courses');
    } else if (index >= 20){
      navigate('/management');
    }
  };

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
            {children.map(({ id: childId, icon, active}) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton selected={selectedIndex === active}
                                sx={item}
                                onClick={(event) => handleListItemClick(event, active)}>
                                {/*onClick={(event) => {dispatch(toSwitch1());console.log("2nd");}}>*/}
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}

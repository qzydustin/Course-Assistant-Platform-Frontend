import * as React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Navigator from '../components/Navigator';
import Calendar from '../components/CoursePlaza/Calendar';
import CourseContent from '../components/CourseContent';
import CreateCourse from '../components/CreateCourse';
import SearchCourse from '../components/SearchCourse';
import CourseHeader from "../components/Header";
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";
import {renewEnrolledCourse} from "./DashboardSlice";
import Settings from "../components/Setting";
import server from "../server.json";

function Copyright() {
  return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
        Course Assistant Platform
      </Link>
      {new Date().getFullYear()}.
    </Typography>
  );
}

let theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#081627',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#4fc3f7',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

const drawerWidth = 256;

export default function Dashboard({server}) {


  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  localStorage.setItem("myServer", server.host);


  const isCalendar = useSelector(state => state.contentsController.isCalendar);
  const isCreateCourse = useSelector(state => state.contentsController.isCreateCourseShown);
  const isSearchCourse = useSelector(state => state.contentsController.isSearchCourseShown);
  const isSettings = useSelector(state => state.contentsController.isSettings);
  const activeCourse = useSelector(state => state.contentsController.activeCourse)


  let email = localStorage.getItem('myEmail')
  let password = localStorage.getItem('myPassword')
  let type = localStorage.getItem('myType')

  let user = JSON.stringify({
    "email": email,
    "password": password,
    "type": type,
  })
  server = localStorage.getItem("myServer")
  axios.post(server+'/get-enrolled-courses',
      user,
      {headers: {'Content-Type': 'application/json'}})
      .then(function(response) {
        if(response.data.code === 1000){
          dispatch(renewEnrolledCourse(response.data.data))
        }
      });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}
            <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                sx={{ display: { sm: 'block', xs: 'none' } }}
            />

        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <CourseHeader onDrawerToggle={handleDrawerToggle}/>
          {isCalendar ? (
              <Calendar/>
          ):null}
          {(activeCourse !== '') ? (
              <Box component="main" sx={{flex: 1, py: 6, px: 4, bgcolor: '#eaeff1'}}>
                <CourseContent/>
              </Box>
          ):null}
          {isCreateCourse ? (
              <Box component="main" sx={{flex: 1, py: 6, px: 4, bgcolor: '#eaeff1'}}>
                <CreateCourse server={server}/>
              </Box>
          ):null}
          {isSearchCourse ? (
              <Box component="main" sx={{flex: 1, py: 6, px: 4, bgcolor: '#eaeff1'}}>
                <SearchCourse server={server}/>
              </Box>
          ):null}
          {isSettings ? (
              <Box component="main" sx={{flex: 1, py: 6, px: 4, bgcolor: '#eaeff1'}}>
              <Settings server={server}/>
              </Box>
          ):null}
          <Box component="footer" sx={{ mb: 0, bgcolor: '#eaeff1' }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

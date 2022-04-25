import * as React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Navigator from './Navigator';
import Content from './components/Content';
import Content_1 from './components/Content_1';
import CourseContent from './components/CourseContent';
import CreateCourse from './components/CreateCourse';
import SearchCourse from './components/SearchCourse';
import ManageHeader from './components/ManageHeader';
import CourseHeader from "./components/CourseHeader";
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";
import {updateEnrolledCourse} from "./dashboardSlice";

function Copyright() {
  return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
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

  // read username and password from cookie, send them to the server
  // if the response is true, show user's contend, if not, back to the
  // login page or show error.
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // console.log("round 0");
  // console.log(store.getState())

  const isFrontPage = useSelector(state => state.contentsController.isContentShown);
  const isSwitch1 = useSelector(state => state.contentsController.isContent1Shown);
  const isCreateCourse = useSelector(state => state.contentsController.isCreateCourseShown);
  const isSearchCourse = useSelector(state => state.contentsController.isSearchCourseShown);
  const activeCourse = useSelector(state => state.contentsController.activeCourse)

  console.log("isActive is ", activeCourse);

  let email = useSelector(state => state.contentsController.email)
  let password = useSelector(state => state.contentsController.password)
  let type = useSelector(state => state.contentsController.type)

  let user = JSON.stringify({
    "email": email,
    "password": password,
    "type": type,
  })
  // console.log("Post get course data: ", user);
  axios.post(server.host+'/get-enrolled-courses',
      user,
      {headers: {'Content-Type': 'application/json'}})
      .then(function(response) {
        if(response.data.code === 1000){
          console.log("Get enrolled course successfully!");
          // console.log(response.data.data);
          dispatch(updateEnrolledCourse(response.data.data))
          // dispatch(renewSearchedCourse(response.data.data));
        } else {
          console.log(response.data.message);
          // dispatch(renewSearchedCourse([]));
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
          {isFrontPage ? (
              <Box>
                <ManageHeader onDrawerToggle={handleDrawerToggle}/>
                <Box component="main" sx={{flex: 1, py: 6, px: 4, bgcolor: '#eaeff1'}}>
                  <Content/>
                </Box>
              </Box>
          ):null}
          {isSwitch1 ? (
              <Box>
                <ManageHeader onDrawerToggle={handleDrawerToggle}/>
                <Box component="main" sx={{flex: 1, py: 6, px: 4, bgcolor: '#eaeff1'}}>
                  <Content_1/>
                </Box>
              </Box>
          ):null}
          {(activeCourse !== '') ? (
              <Box>
                <CourseHeader activeCourse={activeCourse} onDrawerToggle={handleDrawerToggle}/>
                <CourseContent/>
              </Box>
          ):null}
          {isCreateCourse ? (
              <Box>
                <ManageHeader onDrawerToggle={handleDrawerToggle}/>
                <Box component="main" sx={{flex: 1, py: 6, px: 4, bgcolor: '#eaeff1'}}>
                  <CreateCourse server={server}/>
                </Box>
              </Box>
          ):null}
          {isSearchCourse ? (
              <Box>
                <ManageHeader onDrawerToggle={handleDrawerToggle}/>
                <Box component="main" sx={{flex: 1, py: 6, px: 4, bgcolor: '#eaeff1'}}>
                  <SearchCourse server={server}/>
                </Box>
              </Box>
          ):null}
          <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

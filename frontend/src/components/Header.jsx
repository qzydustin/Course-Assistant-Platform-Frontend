import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {saveEmail, savePassword, saveType} from "../pages/DashboardSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import TabBar from "./TabBar";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const lightColor = 'rgba(255, 255, 255, 0.7)';

function ManageHeader(props) {
  const {onDrawerToggle} = props.onDrawerToggle;
  const activeCourse = useSelector(state => state.contentsController.activeCourse)[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = localStorage.getItem("myUserName");

  const handleLogout = (event) => {
    event.preventDefault();

    dispatch(saveEmail(''));
    dispatch(savePassword(''));
    dispatch(saveType(''));
    navigate('/login');
  }
  return (
      <React.Fragment>
        <AppBar color="primary" position="sticky" elevation={0}>
          <Toolbar>
            <Grid container spacing={1} alignItems="center">
              <Grid sx={{display: {sm: 'none', xs: 'block'}}} item>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onDrawerToggle}
                    edge="start"
                >
                  <MenuIcon/>
                </IconButton>
              </Grid>
              <Grid item xs/>
              <Grid item>
                <IconButton color="inherit" sx={{p: 0.5}}>
                  <Avatar src="/static/images/avatar/1.jpg" alt={userName.toUpperCase()}/>
                </IconButton>
              </Grid>
              <Grid item>
                <Button
                    sx={{borderColor: lightColor}}
                    variant="outlined"
                    color="inherit"
                    size="small"
                >
                  {userName}
                </Button>
              </Grid>
              <Grid item>
                <IconButton
                    href="/"
                    variant="body2"
                    sx={{
                      textDecoration: 'none',
                      color: lightColor,
                      '&:hover': {
                        color: 'common.white',
                      },
                    }}
                    rel="noopener noreferrer"
                    target="_blank"
                    onClick={handleLogout}
                >
                  <LogoutOutlinedIcon/>
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBar
            component="div"
            color="primary"
            position="static"
            elevation={0}
            sx={{zIndex: 0}}
        >
          <Toolbar>
            <Grid container alignItems="center" spacing={1}>
              {(activeCourse) ? (<Grid item xs>
                <Typography color="inherit" variant="h5" component="h1">
                  {activeCourse.title}
                </Typography>
              </Grid>) : (
                  <Grid item xs>
                    <Typography color="inherit" variant="h5" component="h1">
                      Course Management
                    </Typography>
                  </Grid>)}
            </Grid>
          </Toolbar>
        </AppBar>
        {activeCourse ? (<TabBar/>) : null}
      </React.Fragment>
  );
}

ManageHeader.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default ManageHeader;

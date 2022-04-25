import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import ListItemButton from "@mui/material/ListItemButton";

const data = [
    {
        title: "Brunch this weekend?",
        author: "Ali Connors",
        contents: " — I'll be in your neighborhood doing errands this…"
    },
    {
        title: "Summer BBQ",
        author: "to Scott, Alex, Jennifer",
        contents: " — Wish I could come, but I'm out of town this…"
    },
    {title: "Oui Oui", author: "Sandra Adams", contents: ' — Do you have Paris recommendations? Have you ever…'}
]

export default function Discussion() {

    const handleThreadClick = (event) => {
        event.preventDefault()

    }
    return (
        <Grid container>
            <Grid item xs={4}>
                <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                    {data.map((thread) => (
                        <Grid>
                            <ListItem alignItems="flex-start">
                                <ListItemButton padding={0} onClick={handleThreadClick}>
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={thread.title}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{display: 'inline'}}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {thread.author}
                                                </Typography>
                                                {thread.contents}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItemButton>
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                        </Grid>
                    ))}
                </List>
            </Grid>
            <Grid item xs={8}>
                <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                    {data.map((thread) => (
                        <Grid>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={thread.title}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{display: 'inline'}}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {thread.author}
                                            </Typography>
                                            {thread.contents}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider component="li"/>
                            <Divider variant="inset" orientation="vertical" component="li"/>
                        </Grid>
                    ))}
                </List>
            </Grid>
        </Grid>
    );
}
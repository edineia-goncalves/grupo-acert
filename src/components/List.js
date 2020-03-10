import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#F5F5F5',
    },
    inline: {
        display: 'inline',
    },
}));

export default function AlignItemsList(props) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            <ListItem alignItems="flex-start">
                <ListItemText
                    primary={props.item}
                />
            </ListItem>
        </List>
    );
}

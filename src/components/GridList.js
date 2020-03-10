import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: "70%",
        height: "100%",
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

export default function BarGridList(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
                {props.data.map(tile => (
                    <GridListTile key={`${tile}-${tile.name}`}>
                        <img src={tile.image[0]} alt={tile.name} />
                        <GridListTileBar
                            title={tile.name}
                            subtitle={<span>{tile.listeners}</span>}
                            actionIcon={
                                <IconButton aria-label={`info about ${tile.name}`} className={classes.icon}>
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

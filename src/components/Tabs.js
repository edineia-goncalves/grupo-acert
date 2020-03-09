import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-acert-${index}`}
            aria-labelledby={`tab-acert-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `tab-acert-${index}`,
        'aria-controls': `tabpanel-acert-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const TabsAcert = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs value={value} onChange={handleChange} aria-label="tabs">
                <Tab label={props.firstLabel} {...a11yProps(0)} />
                <Tab label={props.secondLabel} {...a11yProps(1)} />
                <Tab label={props.thirdLabel} {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <div>{props.firstContent}</div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div>{props.secondContent}</div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div>{props.thirdContent}</div>
            </TabPanel>
        </div>
    );
}

export default TabsAcert;
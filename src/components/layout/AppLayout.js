import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import MainHeader from './MainHeader';
import Sidebar from './Sidebar';
import Main from './Main';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    }
}));

function AppLayout() {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <MainHeader
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />
            <Sidebar
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />
            <Main />
        </div>
    );
}

AppLayout.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default AppLayout;
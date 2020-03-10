import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import * as firebase from 'firebase/app';
import history from '../Helpers/History';

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = { name: '', email: '' };
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        this.setState({ ...user });
    }

    handleSignOut(event) {
        event.preventDefault();
        return firebase.auth().signOut().then(() => {
            localStorage.removeItem("user")
            history.push('/login');
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        const { name, email } = this.state;
        return <div>
            <AppBar position="static" style={{ background: '#2E3B55' }}>
                <Toolbar>
                    <Grid
                        justify="space-between"
                        container
                    >
                        <Grid item>
                            <Typography type="title" color="inherit">
                                <span>Olá {name ? name : email}</span>
                            </Typography>
                        </Grid>

                        <Grid item>
                            <div>
                                <Button
                                    onClick={this.handleSignOut}
                                    type="submit"

                                    variant="contained"
                                    color="primary"
                                >
                                    Sair
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div >
    }
}

export default NavBar;
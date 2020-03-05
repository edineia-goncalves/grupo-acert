import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import 'typeface-roboto';
import * as firebase from 'firebase/app';

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = { email: '', password: '' };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(event) {
        event.preventDefault();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then((res) => {
                return firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <Typography component="h1" variant="h5">
                    Login
   </Typography>
                <form onSubmit={this.handleLogin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={this.state.email}
                        onChange={this.handleChangeEmail}
                        label="Email Address"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={this.state.password}
                        onChange={this.handleChangePassword}
                        label="Password"
                        type="password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Entrar
      </Button>
                    <br></br>
                    <br></br>
                </form>
                <Typography>
                    <Link to="/register">Register</Link>
                </Typography>
            </Grid>
        );
    }
}
export default Login;  
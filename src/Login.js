import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import history from './Helpers/History';
import * as firebase from 'firebase/app';

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = { email: '', password: '' };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.signInWithGoogle = this.signInWithGoogle.bind(this);
    }

    signInWithGoogle(event) {
        event.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(result => {
            console.log(result)
            const user = {
                name: result && result.user && result.user.displayName,
                email: result && result.user && result.user.email,
            }
            localStorage.setItem("user", JSON.stringify(user))
            history.push('/home');
        }).catch(error => {
            console.log(error)
        });
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
        const classes = makeStyles(theme => ({
            paper: {
                marginTop: theme.spacing(8),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            form: {
                width: '100%',
                marginTop: theme.spacing(1),
            },
            submit: {
                margin: theme.spacing(3, 0, 2),
            },
        }));

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Entrar
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleLogin}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={this.state.email}
                            onChange={this.handleChangeEmail}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={this.state.password}
                            onChange={this.handleChangePassword}
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Entrar
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="default"
                            className={classes.submit}
                            onClick={this.signInWithGoogle}
                        >
                            Entrar com Google
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Esqueceu a senha
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" to="/register">Cadastrar-se</Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}
export default Login;  
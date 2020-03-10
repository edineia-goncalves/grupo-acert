import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import history from '../Helpers/History';
import * as firebase from 'firebase/app';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import PasswordReset from './PasswordReset';

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = { email: '', password: '', isOpenDialog: false, error: null };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.signInWithGoogle = this.signInWithGoogle.bind(this);
    }

    toggleDialog = () => {
        this.setState({
            isOpenDialog: !this.state.isOpenDialog
        });
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
            this.setState({ error: error.message })
        });
    }

    handleSignIn(event) {
        event.preventDefault();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                return firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
                    const user = {
                        name: this.state.name,
                        email: this.state.email
                    }
                    localStorage.setItem("user", JSON.stringify(user))
                    history.push('/home');
                })
            })
            .catch((error) => {
                this.setState({ error: error.message })
            });
    }
    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }


    render() {
        const { email, password, error } = this.state;

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

        const divStyle = {
            color: 'red',
        };

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5" >
                        Entrar
                    </Typography>
                    <ValidatorForm ref="form" className={classes.form} noValidate onSubmit={this.handleSignIn}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextValidator
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={this.handleChangeEmail}
                                    autoFocus
                                    validators={['required', 'isEmail']}
                                    errorMessages={['Digite o email', 'email inválido']}
                                />
                                <TextValidator
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Senha"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={this.handleChangePassword}
                                    validators={['required']}
                                    errorMessages={['Digite a senha']}
                                />
                                <Button href="" color="primary" size="small" onClick={this.toggleDialog}>
                                    Esqueceu a senha
                                </Button>
                                <PasswordReset show={this.state.isOpenDialog} onClose={this.toggleDialog}></PasswordReset>
                            </Grid>
                            <Grid item xs={12}>
                                {error &&
                                    <span style={divStyle}>{error}</span>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Entrar
                            </Button>
                            </Grid>
                            <Grid item xs={12}>
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
                            </Grid>
                            <Grid item xs={12}>
                                <Link href="#" variant="body2" to="/register">Cadastrar-se</Link>
                            </Grid>
                        </Grid>
                    </ValidatorForm>
                </div>
            </Container >
        );
    }
}
export default Login;  
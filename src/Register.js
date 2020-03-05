import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import 'typeface-roboto';
import * as firebase from 'firebase/app';
import History from './components/Helpers';


class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = { name: '', email: '', password: '' };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.signInWithGoogle = this.signInWithGoogle.bind(this);
    }

    handleRegister(event) {
        event.preventDefault();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                        this.state.email,
                        this.state.password)
                    .then((res) => {
                        localStorage.setItem("user", JSON.stringify(this.state))
                        History.push('/home');
                    })
            })
            .catch((error) => {
                console.log(error);
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
            History.push('/home');
        }).catch(error => {
            console.log(error)
        });
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        return <div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <Typography component="h1" variant="h5">
                    Registrar
                </Typography>
                <form onSubmit={this.signInWithGoogle}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="default"
                    >
                        Entrar com Google
                </Button>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={this.state.name}
                        onChange={this.handleChangeName}
                        label="Nome completo"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={this.state.email}
                        onChange={this.handleChangeEmail}
                        label="Email"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={this.state.senha}
                        onChange={this.handleChangePassword}
                        label="Senha"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Registrar e entrar
                </Button>
                </form>
                <Typography>
                    <Link to="/login">cancelar</Link>
                </Typography>
            </Grid>
        </div >;
    }
}

export default Register;
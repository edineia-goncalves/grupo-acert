import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import * as firebase from 'firebase/app';
import history from '../Helpers/History';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = { name: '', email: '', password: '', repeatPassword: '' };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleRepeatPassword = this.handleRepeatPassword.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
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
                        const user = {
                            name: this.state.name,
                            email: this.state.email
                        }
                        localStorage.setItem("user", JSON.stringify(user))
                        history.push('/home');
                    })
            })
            .catch((error) => {
                console.log(error);
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

    handleRepeatPassword(event) {
        this.setState({ repeatPassword: event.target.value });
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value === this.state.password) {
                return true;
            }
            return false;
        });
        ValidatorForm.addValidationRule('minLength', (value) => {
            if (value.length >= 6) {
                return true;
            }
            return false;
        });
    }

    componentWillUnmount() {
        ValidatorForm.removeValidationRule('isPasswordMatch');
        ValidatorForm.removeValidationRule('minLength');
    }

    render() {
        const { name, email, password, repeatPassword } = this.state;

        const classes = makeStyles(theme => ({
            paper: {
                marginTop: theme.spacing(8),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: theme.margin(0),
            },
            form: {
                width: '100%',
                marginTop: theme.spacing(3),
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
                        Registrar
                    </Typography>
                    <ValidatorForm ref="form" className={classes.form} noValidate onSubmit={this.handleRegister}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <p>{this.state.errorName}</p>
                                <TextValidator
                                    value={name}
                                    onChange={this.handleChangeName}
                                    label="Nome completo"
                                    autoComplete="name"
                                    name="name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    validators={['required']}
                                    errorMessages={['Digite o nome']}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    value={email}
                                    onChange={this.handleChangeEmail}
                                    autoComplete="email"
                                    validators={['required', 'isEmail']}
                                    errorMessages={['Digite o email', 'email inválido']}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Senha"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={this.handleChangePassword}
                                    autoComplete="current-password"
                                    validators={['required', 'minLength']}
                                    errorMessages={['Digite a senha', 'A senha deve conter pelo menos 6 caracteres']}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="repeatPassword"
                                    label="Confirmar senha"
                                    type="password"
                                    id="repeatPassword"
                                    value={repeatPassword}
                                    onChange={this.handleRepeatPassword}
                                    validators={['isPasswordMatch', 'required']}
                                    errorMessages={['senhas não coincidem', 'confirme sua senha']}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                >
                                    Entrar
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2" to="/login">Já tem uma conta ? Entrar</Link>
                            </Grid>
                        </Grid>
                    </ValidatorForm>
                </div>
            </Container>
        );
    }
}

export default Register;
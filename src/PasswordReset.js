import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import * as firebase from 'firebase/app';

class PasswordReset extends React.Component {

    constructor(props) {
        super(props)
        this.state = { email: '', errorEmail: false };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.passwordResetEmail = this.passwordResetEmail.bind(this);
    }

    passwordResetEmail(event) {
        event.preventDefault();
        const auth = firebase.auth();

        auth.sendPasswordResetEmail(this.state.email).then((res) => {
        }).catch(() => {
            this.setState({ errorEmail: true });
        });
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    render() {
        const { show, onClose } = this.props;

        return (
            <Dialog aria-labelledby="simple-dialog-title" open={show} onClose={onClose}>
                <DialogTitle id="simple-dialog-title">Recuperação de senha</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Insira o endereço de e-mail associado à sua conta
                    </DialogContentText>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={this.state.email}
                        onChange={this.handleChangeEmail}
                        autoFocus
                        type="email"
                        error={this.state.errorEmail}
                        helperText={this.state.errorEmail ? 'E-mail não encontrado' : ' '}
                    >
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button size="small" onClick={onClose} color="primary">
                        Cancelar
                    </Button>
                    <Button size="small" onClick={this.passwordResetEmail} color="primary">
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

PasswordReset.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
};

export default PasswordReset;
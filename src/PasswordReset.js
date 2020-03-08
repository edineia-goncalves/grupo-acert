import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

export default function PasswordReset(props) {
    let { show, onClose } = props;

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
                    autoFocus
                    type="email"
                />
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button size="small" onClick={onClose} s color="primary">
                    Enviar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

PasswordReset.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
};
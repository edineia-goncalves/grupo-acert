import React from 'react';
import Button from '@material-ui/core/Button';
import * as firebase from 'firebase/app';
import History from './components/Helpers';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = { name: '', email: '' };

        this.handleSignOut = this.handleSignOut.bind(this);
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        this.setState({ ...user });
    }

    handleSignOut(event) {
        event.preventDefault();
        return firebase.auth().signOut().then(() => {
            localStorage.setItem("user", '')
            History.push('/login');
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return <div>
            <span>Olá {this.state.name} -  {this.state.email}</span>
            <Button
                onClick={this.handleSignOut}
                type="submit"

                variant="contained"
                color="primary"
            >
                Sair
      </Button>
        </div>
    }
}

export default Home;
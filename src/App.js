import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import History from './components/Helpers';
import PrivateRoute from './components/PrivateRoute';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={History}>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);

import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'typeface-roboto';
import blueGrey from '@material-ui/core/colors/blueGrey';
import pink from '@material-ui/core/colors/pink';

import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Home from 'views/Home/'

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    type: 'light',
    primary: blueGrey,
    secondary: pink,
  },
  typography: {
    useNextVariants: true,

    // successColor: "#4caf50",
    // dangerColor: "#f44336",
  },

});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <Switch>
            {/* <Route path="/login" name="Login" component={Login} /> */}
            <Route path="/" name="Home" component={Home} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;

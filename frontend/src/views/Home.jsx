import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from "react-router-dom";

import MainAppBar from 'components/Header/MainAppBar';
import Footer from '../components/Footer/Footer';
import Tabs from '../components/Tabs/Tabs';


// import Sidebar from './Sidebar';

import AppRoutes from "routes/AppRoutes";

const styles = theme => ({
  root: {
    display: 'flex',
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '110vh',
  },
  appBarSpacer: theme.mixins.toolbar,
});

class Home extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  switchRoutes = () => {
    return (
      <Switch>
        {AppRoutes.map((prop, key) => {
          if (prop.redirect)
            return <Redirect from={prop.path} to={prop.to} key={key} />;
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    )
  }

  render() {
    const { classes, ...rest } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <MainAppBar 
            routes={AppRoutes}
            {...rest}
        />
        <Tabs>

        </Tabs>

        <div className={classes.root}>
          <main className={classes.content}>
            {this.switchRoutes()}
          </main>
        </div> 
        <Footer/> 
      
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(Home));

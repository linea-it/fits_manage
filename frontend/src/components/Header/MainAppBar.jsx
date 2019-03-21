import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';


const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,

  },  
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

function MainAppBar(props) {
  const { classes, location, routes } = props;

  function getTitle() {
    var title;
    routes.map((prop, key) => {
      if (prop.path === location.pathname) {
        title = prop.appbarName;
      }
      return null;
    });
    return title;
  }
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {/* <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={props.toggleDrawer}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h5" color="inherit" className={classes.grow}>
          {getTitle()}
        </Typography>
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  );
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
};

export default withStyles(styles)(MainAppBar);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logoLinea from 'assets/img/linea-logo-mini.png';


const styles = theme => ({
  root: {
    margin: 0,
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    height: '6vh',
},
  });

function Footer(props) {
  const { classes, location, routes } = props;

//   function getTitle() {
//     var title;
//     routes.map((prop, key) => {
//       if (prop.path === location.pathname) {
//         title = prop.appbarName;
//       }
//       return null;
//     });
//     return title;
//   }
  return (
    <AppBar position="static" className={classes.appBar}>
       <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
            >
              Developer Portal Instance
            </Typography>
            <Typography variant="h6" color="inherit">
              Powered by LIneA
            </Typography>
            <figure>
              <img
                alt="Contemplative Reptile"
                src={logoLinea}
                title="Contemplative Reptile"
              />
            </figure>
      </Toolbar>
    </AppBar>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
};

export default withStyles(styles)(Footer);
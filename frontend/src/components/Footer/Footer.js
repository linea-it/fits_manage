import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logoLinea from 'assets/img/linea-logo-mini.png';
import { Link } from 'react-router-dom';


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
},
  });

function Footer(props) {
  const { classes } = props;

  return (
    <AppBar position="static" className={classes.appBar}>
       <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
            >
              
            </Typography>
            <Typography variant="h6" target="_blank" color="inherit">
              Powered by LIneA
            </Typography>
            <a href={`http://www.linea.gov.br/`}>
            <figure>
              <img
                alt=""
                src={logoLinea}
                title=""
              />
            </figure>
            </a>
      </Toolbar>
    </AppBar>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(Footer);
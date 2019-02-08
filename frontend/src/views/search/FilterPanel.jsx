import React, { Component } from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import { FilterForm } from "./FilterForm";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  //  paper: {
  //    marginTop: theme.spacing.unit * 8,
  //    display: "flex",
  //    flexDirection: "column",
  //    alignItems: "center",
  //    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${theme
  //      .spacing.unit * 5}px`
  //  },
  container: {
    maxWidth: "200px"
  }
});

class FilterPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  // Retirado deste exemplo 
  // https://dev.to/finallynero/react-form-using-formik-material-ui-and-yup-2e8h

  render() {
    const classes = this.props;
    return (
      <React.Fragment>
        <div className={classes.container}>
          {/* <Paper elevation={1} className={classes.paper}> */}
          <Formik
            render={props => <FilterForm {...props} />}
          />
          {/* </Paper> */}
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(FilterPanel);

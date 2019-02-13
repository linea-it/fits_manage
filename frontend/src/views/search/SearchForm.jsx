import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
const styles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  Button: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
})

class SearchForm extends Component {

  state = {
    search: ''
  }

  handleChange = e => {
    this.setState({ search: e.target.value })
  }
  catchReturn = event => {
    if (event.key === 'Enter') {
      this.handleSearch()
      event.preventDefault();
    }
  }

  handleSearch = () => {
    this.props.handleSearch(this.state.search)
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root} elevation={1}>
        <InputBase
          type="search"
          fullWidth
          autoFocus
          id="some-id"
          onChange={this.handleChange}
          onKeyPress={this.catchReturn}
          value={this.state.search}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <Divider className={classes.divider} />
        <Button color="primary" className={classes.Button}>
          Search
        </Button>
      </Paper>
    );
  }
}
SearchForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchForm);


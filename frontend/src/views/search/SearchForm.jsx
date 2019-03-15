import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250,
  },
  buttonUpload: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  card: {
    marginTop: theme.spacing.unit,
  },
})

class SearchForm extends Component {

  state = this.initialState;

  get initialState() {
    return {
      piName: '',
      observer: '',
      target: '',
      targetList: '',
      telescope: 'any',
      instrument: 'any',
      exposureTime: '',
      band: 'any',
      startDate: '',
      endDate: '',
    };
  }

  handleChange = name => event => {

    const value = event.target.value;

    this.setState({ [name]: value }, () => {
      if (name === 'telescope') {
        this.props.handleChangeTelescope(value)
      }
      if (name === 'instrument') {
        this.props.handleChangeInstrument(value)
      }
    });
  };

  handleClear = () => {
    this.setState(this.initialState, ()=> this.props.handleClear());
  }

  handleSearch = () => {
    this.props.handleSearch(this.state)
  }

  render() {
    const { classes, telescopes, instruments, bands } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <Grid container spacing={16}>
          <Grid item xs={6} sm={6} lg={6} >
            <TextField
              name="piName"
              label="PI Name"
              value={this.state.piName}
              onChange={this.handleChange('piName')}
              className={classes.textField}
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              name="observer"
              label="Observer"
              value={this.state.observer}
              onChange={this.handleChange('observer')}
              className={classes.textField}
              fullWidth
              margin="normal"
            />
            <Card className={classes.card} elevation={2}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Target
              </Typography>
                <TextField
                  name="target"
                  label="Target Name"
                  value={this.state.target}
                  onChange={this.handleChange('target')}
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                />
                <Button color="primary" variant="contained" className={classes.buttonUpload} disabled>
                  Upload Target List
                </Button>
              </CardContent>
            </Card>
            <FormControl className={classes.textField} margin="normal" fullWidth>
              <InputLabel htmlFor="telescope">Telescope</InputLabel>
              <Select
                native
                value={this.state.telescope}
                onChange={this.handleChange('telescope')}
                inputProps={{
                  name: 'telescope',
                  id: 'telescope',
                }}

              >
                <option value="any">Any</option>
                {telescopes.map((e, i) => {
                  return (
                    <option key={i} value={e}>{e}</option>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl className={classes.textField} margin="normal" fullWidth>
              <InputLabel htmlFor="instrument">Instrument</InputLabel>
              <Select
                native
                value={this.state.instrument}
                onChange={this.handleChange('instrument')}
                inputProps={{
                  name: 'instrument',
                  id: 'instrument',
                }}
                disabled={this.state.telescope === 'any' ? true : false}
              >
                <option value="any">Any</option>
                {instruments.map((e, i) => {
                  return (
                    <option key={i} value={e}>{e}</option>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl className={classes.textField} margin="normal" fullWidth>
              <InputLabel htmlFor="band">Filter</InputLabel>
              <Select
                native
                value={this.state.band}
                onChange={this.handleChange('band')}
                inputProps={{
                  name: 'band',
                  id: 'band',
                }}
                disabled={this.state.instrument === 'any' ? true : false}
              >
                <option value="any">Any</option>
                {bands.map((e, i) => {
                  return (
                    <option key={i} value={e}>{e}</option>
                  )
                })}
              </Select>
            </FormControl>
            <TextField
              id="exposureTime"
              label="Exposure Time (s)"
              value={this.state.exposureTime}
              onChange={this.handleChange('exposureTime')}
              type="number"
              className={classes.textField}
              fullWidth
              margin="normal"
              helperText="time in seconds, greater than or equal to."
            />
          </Grid>
          <Grid item xs={6} sm={6} lg={6} >
            <Card className={classes.card} elevation={2}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Observation Date
                </Typography>
                <TextField
                  name="startDate"
                  label="Start Date"
                  type="date"
                  value={this.state.startDate}
                  onChange={this.handleChange('startDate')}
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  name="endDate"
                  label="End Date"
                  type="date"
                  value={this.state.endDate}
                  onChange={this.handleChange('endDate')}
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </CardContent>
            </Card>
            <Card className={classes.card} elevation={2}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Coordinates
                </Typography>
                <TextField
                  id="ra"
                  label="RA (deg)"
                  value={this.state.ra}
                  onChange={this.handleChange('ra')}
                  type="number"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="dec"
                  label="Dec (deg)"
                  value={this.state.dec}
                  onChange={this.handleChange('dec')}
                  type="number"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="radius"
                  label="Radius (deg)"
                  value={this.state.radius}
                  onChange={this.handleChange('radius')}
                  type="number"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid container justify="flex-end" alignContent="flex-end">
            <Button color="primary" variant="outlined" onClick={this.handleClear}>
              Clear
            </Button>
            <Button color="primary" variant="contained" onClick={this.handleSearch}>
              Ok
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}
SearchForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  handleChangeTelescope: PropTypes.func.isRequired,
  handleChangeInstrument: PropTypes.func.isRequired,
  telescopes: PropTypes.array.isRequired,
  instruments: PropTypes.array.isRequired,
  bands: PropTypes.array.isRequired,
};

export default withStyles(styles)(SearchForm);


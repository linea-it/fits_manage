import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ResultGrid from './ResultGrid';
import SearchForm from './SearchForm';
import ExposureDetail from 'views/exposure/Detail';
import Aladin from 'components/Aladin/Aladin';

import SearchApi from 'api/Search';

const styles = theme => ({})

class SearchPanel extends Component {

  state = {
    data: [],
    showExposureDetail: false,
    exposureId: null,
    telescopes: [],
    instruments: [],
    bands: [],
    exposureTimes: [],
    search: {
      target: "",
      telescope: "",
      instrument: "",
      band: "",
      exposureTime: 0
    },
    exposureCount: 0,
    selected: {}
  }

  componentDidMount() {

    this.loadData();

  }

  loadData = async () => {

    const dtelescopes = await SearchApi.getTelescopes();
    const telescopes = dtelescopes.telescopes;

    const dinstruments = await SearchApi.getInstruments();
    const instruments = dinstruments.instruments;

    const dbands = await SearchApi.getBands();
    const bands = dbands.bands;

    const dexposureTimes = await SearchApi.getExposureTimes();
    const exposureTimes = dexposureTimes.exposureTimes;

    const dexposureCount = await SearchApi.getExposureCount();
    const exposureCount = dexposureCount.exposureCount;

    this.setState({
      telescopes: telescopes,
      instruments: instruments,
      bands: bands,
      exposureTimes: exposureTimes,
      exposureCount: exposureCount,
    }, () => this.loadExposures())

  }

  loadExposures = async () => {

    const { search } = this.state;

    const dexposures = await SearchApi.getAllExposures(search);
    const exposures = dexposures.exposures.edges.map(edge => edge.node)

    this.setState({
      data: exposures,
    });
  }

  handleSearch = (fields) => {
    this.setState({
      search: fields,
    }, () => { this.loadExposures() })
  }

  handleDetail = rowData => {
    this.setState({
      exposureId: rowData.id,
      showExposureDetail: true,
    })
  }

  handleCloseDetail = () => {
    this.setState({
      exposureId: null,
      showExposureDetail: false,
    })
  }

  handleSelection = selected => {
    this.setState({ selected: selected })
  }

  render() {

    const { data, showExposureDetail, exposureId, telescopes, instruments, bands, selected, exposureCount } = this.state

    var position = [];
    if (selected) {
      position = [selected.raDeg, selected.decDeg];
    }

    return (
      <div>
        <Grid container spacing={24} >
          <Grid item xs={12} sm={12} lg={6} xl={4} >
            <Card>
              <CardContent>
                <SearchForm handleSearch={this.handleSearch} telescopes={telescopes} instruments={instruments} bands={bands} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} xl={8}>
            <Card>
              <CardContent>
                <Aladin exposures={data} desfootprint={false} position={position} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <Card>
              <CardHeader subheader={`Available Exposures: ${exposureCount}`} />
              <CardContent>
                <ResultGrid rows={data} onDetail={this.handleDetail} handleSelection={this.handleSelection} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <ExposureDetail open={showExposureDetail} exposureId={exposureId} onClose={this.handleCloseDetail} />
      </div >

    );
  }
}
export default withStyles(styles)(SearchPanel);
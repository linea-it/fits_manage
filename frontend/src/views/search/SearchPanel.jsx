import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { forOwn, isEmpty } from 'lodash'
import ResultGrid from './ResultGrid'
import SearchForm from './SearchForm'
import ExposureDetail from 'views/exposure/Detail';
import Aladin from 'components/Aladin/Aladin';



import SearchApi from 'api/Search'

const styles = theme => ({})

class SearchPanel extends Component {

  state = {
    tabIdx: 0,
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
    }
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

    this.setState({
      telescopes: telescopes,
      instruments: instruments,
      bands: bands,
      exposureTimes: exposureTimes
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
  handleChange = (event, value) => {
    this.setState({ tabIdx: value });
  };
  
  handleSearch = (fields) => {
    console.log("handleSearch: ", fields)

    this.setState({
      search: fields,
    }, ()=> {this.loadExposures()})

    // const params = []

    // forOwn(fields, function(value, key) {
    //   if (!isEmpty(value)) {
    //     console.log("value: %o, key: %o", value, key )
    //   }
    // })

  }

  handleDetail = rowData => {
    console.log("handleDetail: ", rowData);
    this.setState({
      exposureId: rowData.id,
      showExposureDetail: true,
    })
  }

  handleCloseDetail = () => {
    console.log("handleCloseDetail");
    this.setState({
      exposureId: null,
      showExposureDetail: false,
    })
  }

  render() {
    // const { classes }  = this.props;
    const { data, showExposureDetail, exposureId, telescopes, instruments, bands, exposureTimes, tabIdx } = this.state

    console.log("Data: ", data)

    return (
      <div>
        <Grid container spacing={24} >
          <Grid item xs={12} sm={12} lg={6} xl={4} >    
            <Card>
              <CardContent>
              <SearchForm handleSearch={this.handleSearch} telescopes={telescopes} instruments={instruments} bands={bands} exposureTimes={exposureTimes}/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} xl={8}>    
            <Card>
              <CardContent>
              <Aladin exposures={data} desfootprint={false}/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <ResultGrid rows={data} onDetail={this.handleDetail} />
          </Grid>
        </Grid>
        <ExposureDetail open={showExposureDetail} exposureId={exposureId} onClose={this.handleCloseDetail} />
      </div >

    );
  }
}
export default withStyles(styles)(SearchPanel);
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';

import ResultGrid from './ResultGrid'
import SearchForm from './SearchForm'
import ExposureDetail from 'views/exposure/Detail';

import SearchApi from 'api/Search'

const styles = theme => ({})

class SearchPanel extends Component {

  state = {
    data: [],
    showExposureDetail: false,
    exposureId: null,
    telescopes: [],
    instruments: []
  }

  componentDidMount() {

    this.loadData();

  }

  loadData = async () => {
    const data = await SearchApi.getAllExposures();

    const exposures = data.exposures.edges.map(edge => edge.node)

    const dtelescopes = await SearchApi.getTelescopes();
    const telescopes = dtelescopes.telescopes;

    const dinstruments = await SearchApi.getInstruments();
    const instruments = dinstruments.instruments;

    this.setState({
      data: exposures,
      telescopes: telescopes,
      instruments: instruments,
    })

  }

  handleSearch = (e) => {
    
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

    const { data, showExposureDetail, exposureId, telescopes, instruments } = this.state

    return (
      <div>
        <Grid container spacing={24} >
          <Grid item xs={12} sm={12} lg={6} xl={4} >    
            <Card>
              <CardContent>
              <SearchForm handleSearch={this.handleSearch} telescopes={telescopes} instruments={instruments}/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} >    
            <Card>
              <CardContent>
              
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <Card>
              <CardContent>
                <ResultGrid rows={data} onDetail={this.handleDetail}/>
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
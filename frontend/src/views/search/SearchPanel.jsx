import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';

import ResultGrid from './ResultGrid'
import SearchForm from './SearchForm'

import SearchApi from 'api/Search'

const styles = theme => ({})

class SearchPanel extends Component {

  state = {
    data: []
  }

  componentDidMount() {

    this.loadData();

  }

  loadData = async () => {
    const exposures = await SearchApi.getAllExposures();

    const data = exposures.allExposures.edges.map(edge => edge.node)
    this.setState({
      data: data
    })
  }

  handleSearch = (e) => {
    console.log("handleSearch: ", e)
  }

  render() {

    const { data } = this.state

    return (
      <div>
        <Grid container spacing={24} >
          <Grid item xs={6} sm={6} lg={6} >    
            <Card>
              <CardContent>
              <SearchForm handleSearch={this.handleSearch}/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={6} lg={6} >    
            <Card>
              <CardContent>
              
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <Card>
              <CardContent>
                <ResultGrid rows={data} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div >

    );
  }
}
export default withStyles(styles)(SearchPanel);
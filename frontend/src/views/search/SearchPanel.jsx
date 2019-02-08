import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';

import ResultGrid from './ResultGrid'
import FilterPanel from './FilterPanel'

const styles = theme => ({})

class SearchPanel extends Component {

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6} lg={6}>
            <Card>
              <CardContent>
                <FilterPanel />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <Card>
              <CardContent>
                Produtos mais vendidos
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
          <Card>
              <CardContent>
                <ResultGrid />
              </CardContent>
            </Card>          
          </Grid>
        </Grid>
      </div>

    );
  }
}
export default withStyles(styles)(SearchPanel);
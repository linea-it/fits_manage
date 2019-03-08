import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';

import SearchApi from 'api/Search'
import HeaderGrid from './HeaderGrid';

const styles = theme => ({})

class ExposureDetail extends Component {

  state = {
    data: {},
    headers: []
  }

  componentDidMount() {

    this.loadData(this.props.exposureId);
  }

  loadData = async (id) => {
    if (id !== null) {
      const data = await SearchApi.getExposureById(id);

      const headers = data.exposure.headers.edges.map(edge => edge.node)

      this.setState({
        data: data.exposure,
        headers: headers,
      })
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.exposureId !== prevProps.exposureId ) {
      this.loadData(this.props.exposureId);
    }
  }

  handleClose = () => {
    this.props.onClose();
  }

  render() {

    const { classes, exposureId, ...other } = this.props;

    const { data, headers } = this.state;

    return (

      <Dialog 
        onClose={this.handleClose} 
        scroll="body"
        fullWidth={true}
        maxWidth="lg"
        {...other}>
        <DialogTitle>{data.filename}</DialogTitle>
          <DialogContent>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12} lg={6} xl={5} >
                {/* <Card>
                  <CardContent> */}
                    <HeaderGrid rows={headers} />
                  {/* </CardContent>
                </Card> */}
              </Grid>
              <Grid item xs={12} sm={12} lg={6} xl={6} >
                {/* <Card>
                  <CardContent> */}
                  <Paper>
                    Preview da imagem
                  </Paper>
                  {/* </CardContent>
                </Card> */}
              </Grid>
            </Grid>
          </DialogContent>
      </Dialog>
    );
  }
}
export default withStyles(styles)(ExposureDetail);
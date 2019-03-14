import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ResultGrid from './ResultGrid';
import DownloadGrid from './DownloadGrid';
import SearchForm from './SearchForm';
import ExposureDetail from 'views/exposure/Detail';
import Aladin from 'components/Aladin/Aladin';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SearchApi from 'api/Search';
import Badge from '@material-ui/core/Badge';
import { remove, findIndex } from 'lodash';
import Button from '@material-ui/core/Button';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

const styles = theme => ({
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },  
  card: {
    height: '100%',
  }
})

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
    },
    exposureCount: 0,
    selected: {},
    activeTab: 0,
    toDownload: []
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

    // const dexposureCount = await SearchApi.getExposureCount();
    // const exposureCount = dexposureCount.exposureCount;

    this.setState({
      telescopes: telescopes,
      instruments: instruments,
      bands: bands,
      exposureTimes: exposureTimes,
      // exposureCount: exposureCount,
    }, () => this.loadExposures())

  }

  loadExposures = async () => {

    const { search } = this.state;

    const dexposures = await SearchApi.getAllExposures(search);
    const exposures = dexposures.exposures.edges.map(edge => edge.node)
    const exposureCount = dexposures.exposures.totalCount;

    this.setState({
      data: exposures,
      exposureCount: exposureCount
    });
  }
  handleChange = (event, value) => {
    this.setState({ tabIdx: value });
  };
  
  handleSearch = (fields) => {
    this.setState({
      search: fields,
    }, () => { this.loadExposures() })
  }

  handleClear = () => {
    this.setState({
      data: [],
      showExposureDetail: false,
      exposureId: null,
      search: {},
      exposureCount: 0,
      selected: {},
    })
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

  handleChangeTab = (event, value) => {
    this.setState({ activeTab: value })
  }

  handleAdd = (record) => {
    var { toDownload } = this.state;

    if (findIndex(toDownload, function (el) {
      return el.filename === record.filename;
    }) !== -1) {
      this.removeFromDownload(record);
    } else {
      this.addToDownload(record);
    }
  }

  addToDownload = (record) => {
    var { toDownload } = this.state;

    toDownload.push(record);
    this.setState({
      toDownload: toDownload
    }, () => { this.loadExposures() });
  }

  removeFromDownload = (record) => {
    const { toDownload } = this.state;

    var rows = remove(toDownload, function (el) {
      return el.filename !== record.filename});

    this.setState({
      toDownload: rows,
    }, () => { this.loadExposures() });
  }

  handleRemove = (record) => {
    this.removeFromDownload(record);
  }

  handleRemoveAll = () => {
    this.setState({
      toDownload: []
    })
  }
 
  renderList = () => {
    const { data, exposureCount, toDownload } = this.state
    return (
      <Card>
        <CardHeader subheader={`Results: ${exposureCount}`} />
        <CardContent>
          <ResultGrid rows={data} onDetail={this.handleDetail} handleSelection={this.handleSelection} handleAdd={this.handleAdd} toDownload={toDownload} />
        </CardContent>
      </Card>
    )
  }

  renderDownloadList = () => {
    const { toDownload } = this.state;
    const { classes } = this.props;
    return (
      <Card>
        {/* <CardHeader /> */}
        <CardContent>
          <DownloadGrid rows={toDownload} handleRemove={this.handleRemove} />
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" variant="outlined" onClick={this.handleRemoveAll}>
            Empty List
          </Button>
          <Button size="small" color="primary" variant="contained" disabled={!toDownload.length}>
            Download
            <CloudDownloadIcon className={classes.rightIcon} />
          </Button>          
      </CardActions>
      </Card>
    )
  }

  renderHelp = () => {
    return (
      <Card>
        <CardHeader subheader="TODO HELP page" />
        <CardContent>
        </CardContent>
      </Card>
    )
  }

  render() {

    const { classes } = this.props;
    const { data, showExposureDetail, exposureId, telescopes, instruments, bands, selected, activeTab, toDownload } = this.state

    var position = [];
    if (selected) {
      position = [selected.raDeg, selected.decDeg];
    }

    return (
      <div>
        <Grid container spacing={24} alignItems="stretch">
          <Grid item xs={12} sm={12} lg={6} xl={4} >
            <Card className={classes.card}>
              <CardContent>
                <SearchForm handleSearch={this.handleSearch} handleClear={this.handleClear} telescopes={telescopes} instruments={instruments} bands={bands} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} xl={8}>
            <Card className={classes.card}>
              <CardContent>
                <Aladin exposures={data} desfootprint={false} position={position} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <Tabs value={activeTab} onChange={this.handleChangeTab}>
              <Tab label="Images" />
              <Tab label={
                <Badge className={classes.padding} color="secondary" badgeContent={toDownload.length}>
                  Download
              </Badge>
              } />
              <Tab label="Help" />
            </Tabs>
            {activeTab === 0 && this.renderList()}
            {activeTab === 1 && this.renderDownloadList()}
            {activeTab === 2 && this.renderHelp()}
          </Grid>
        </Grid>
        <ExposureDetail open={showExposureDetail} exposureId={exposureId} onClose={this.handleCloseDetail} />
      </div >

    );
  }
}
export default withStyles(styles)(SearchPanel);
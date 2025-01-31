import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
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
    pageSize: 25,
    currentPage: 0,
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
      exposureTime: 0,
      observer: "",
      ra:0,
      dec:0,
      radius:0,
    },
    exposureCount: 0,
    selected: {},
    activeTab: 0,
    toDownload: [],
    loading: false
  }

  
  componentDidMount() {

    
   
    this.loadData();

  }

  loadData = async () => {

    const dtelescopes = await SearchApi.getTelescopes();
    if(dtelescopes != null)
    {
    const telescopes = dtelescopes.telescopes;
    
    this.setState({
      telescopes: telescopes,
    })
  }

  }

  loadExposures = async (currentPage) => {

    if (!currentPage) {
      currentPage = this.state.currentPage;
    }

    this.setState({
      loading: true,
    });

    const { search, pageSize } = this.state;

    const dexposures = await SearchApi.getAllExposures(search, pageSize, currentPage);
    const exposures = dexposures.exposures.edges.map(edge => edge.node);
    const exposureCount = await SearchApi.getExposuresCount(search);
    var i = 0;
    var nexposures = new Array();
    for(i = 0; i < exposures.length; i++)
    {
      var im = SearchApi.calcD(parseFloat(search.ra).toFixed(8), parseFloat(search.dec).toFixed(8), 
                parseFloat(exposures[i].raDeg).toFixed(8), parseFloat(exposures[i].decDeg).toFixed(8), 
                parseFloat(search.radius)).toFixed(8);
      if(!im){
        //console.log("fora do raio");
      }
      else{
        //console.log("dentro");
        nexposures.push(exposures[i]);
      }
    }

    
    this.setState({
      data: nexposures,
      exposureCount: exposureCount,
      currentPage: currentPage,
      loading: false,
    });

  }

  handleChangeTelescope = (telescope) => {
    if (telescope === 'any') {
      this.setState({
        instruments: [],
        bands: [],
      })
    }
    this.loadInstruments(telescope)
  }

  loadInstruments = async (telescope) => {
    const dinstruments = await SearchApi.getInstrumentsByTelescope(telescope);
    const instruments = dinstruments.instruments;

    this.setState({
      instruments: instruments
    })
  }

  handleChangeInstrument = (instrument) => {
    if (instrument === 'any') {
      this.setState({
        bands: [],
      })
    }
    this.loadBands(instrument)
  }

  loadBands = async (instrument) => {
    const dbands = await SearchApi.getBandsByInstrument(instrument);
    const bands = dbands.bands;

    this.setState({
      bands: bands
    })
  }


  handleChange = (event, value) => {
    this.setState({ tabIdx: value });
  };

  handleSearch = (fields) => {
    console.log(fields);
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
    var { toDownload, data } = this.state;

    // this.setState({
    //   oldData: data,
    //   data: []
    // }, () => {
    //   if (findIndex(toDownload, function (el) {
    //     return el.filename === record.filename;
    //   }) !== -1) {
    //     this.removeFromDownload(record);
    //   } else {
    //     this.addToDownload(record);
    //   }      
    // })
    if (findIndex(toDownload, function (el) {
      return el.filename === record.filename;
    }) !== -1) {
      this.removeFromDownload(record);
    } else {
      this.addToDownload(record);
    }
  }

  addToDownload = (record) => {
    var { toDownload, data } = this.state;

    toDownload.push(record);

    this.setState({
      toDownload: toDownload,
    }, () => {
      // this.loadExposures() 
      this.fakeReload()
    });

    // this.setState({
    //   toDownload: toDownload,
    //   data: data,
    //   oldData: [],
    //   loading: false
    // });    
  }

  removeFromDownload = (record) => {
    const { toDownload } = this.state;

    var rows = remove(toDownload, function (el) {
      return el.filename !== record.filename
    });

    this.setState({
      toDownload: rows,
    }, () => {
      this.fakeReload()
    });

  }

  fakeReload = () => {
    const { data } = this.state;

    this.setState({
      data: [],
      oldData: data,
      loading: true,
    }, () => {
      this.setState({
        data: this.state.oldData,
        oldData: [],
        loading: true,
      })
    });
  }

  handleRemove = (record) => {
    this.removeFromDownload(record);
  }

  handleRemoveAll = () => {
    this.setState({
      toDownload: []
    }, () => {
      this.fakeReload()
    })
  }
  
  logArrayElements = (element, index, array) => {
   

    fetch(`http://localhost/data/${element.filename}`)
        .then(response => {
          response.blob().then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = element.filename;
            a.click();
        
            console.log(response.url);
          });
          window.open(response.url);
      });
  }
  handleDownload = () =>{
   
    const { toDownload } = this.state;
   
    toDownload.forEach(this.logArrayElements);
    
  }
  handleChangePage = (currentPage) => {
    this.loadExposures(currentPage);
  }

  renderList = () => {
    const { data, exposureCount, pageSize, currentPage, toDownload, loading } = this.state
    return (
      <Card>
        <CardHeader subheader={`Results: ${exposureCount}`} />
        <CardContent>
          <ResultGrid
            rows={data}
            totalCount={exposureCount}
            pageSize={pageSize}
            currentPage={currentPage}
            handleChangePage={this.handleChangePage}
            onDetail={this.handleDetail}
            handleSelection={this.handleSelection}
            handleAdd={this.handleAdd}
            toDownload={toDownload}
            loading={loading}
          />
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
          <Button size="small" color="primary" variant="contained" disabled={!toDownload.length} onClick={this.handleDownload}>
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
                <SearchForm
                  handleSearch={this.handleSearch}
                  handleClear={this.handleClear}
                  handleChangeTelescope={this.handleChangeTelescope}
                  handleChangeInstrument={this.handleChangeInstrument}
                  telescopes={telescopes}
                  instruments={instruments}
                  bands={bands} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} xl={8}>
            <Card className={classes.card}>
              <CardContent className={classes.card}>
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
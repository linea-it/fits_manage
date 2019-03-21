import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, Table, TableHeaderRow, ColumnChooser,
  TableColumnVisibility, Toolbar, TableColumnResizing,
  TableSelection, PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import {
  SortingState, IntegratedSorting,
  DataTypeProvider, SelectionState,
  PagingState, CustomPaging,
} from '@devexpress/dx-react-grid';
import moment from 'moment';
import filesize from 'filesize';
import IconButton from '@material-ui/core/IconButton';
import ZoomIn from '@material-ui/icons/ZoomIn';
import GetAppIcon from '@material-ui/icons/GetApp';
import PropTypes from 'prop-types';
import { findIndex } from 'lodash';
import { Paper, CircularProgress } from '@material-ui/core';


const DateFormatter = ({ value }) => `${moment(value).locale('en').format("L LTS")}`;

const DateTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={DateFormatter}
    {...props}
  />
);

const SizeFormatter = ({ value }) => `${filesize(value)}`;

const SizeTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={SizeFormatter}
    {...props}
  />
);


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  progress: {
    position: 'absolute',
    top: '70%',
    left: '50%',
    margin: '-30px 0 0 -20px',
    zIndex: '99',
  },
})

class ResultGrid extends Component {

  state = this.initialState;

  get initialState() {
    return {
      columns: [
        { name: 'detail', title: ' ' },
        { name: 'btnDownload', title: 'Download' },
        { name: 'filename', title: 'Filename' },
        { name: 'target', title: 'Target' },
        { name: 'ra', title: 'RA' },
        { name: 'dec', title: 'Dec' },
        { name: 'dateObs', title: 'Date Obs' },
        { name: 'band', title: 'Filter' },
        { name: 'exposureTime', title: 'Exptime' },
        { name: 'telescope', title: 'Telescope' },
        { name: 'instrument', title: 'Instrument' },
        { name: 'observer', title: 'Oberver' },
        { name: 'fileSize', title: 'Size' },
      ],
      defaultColumnWidths: [
        { columnName: 'detail', width: 100 },
        { columnName: 'btnDownload', width: 100 },
        { columnName: 'filename', width: 220 },
        { columnName: 'target', width: 120 },
        { columnName: 'ra', width: 80 },
        { columnName: 'dec', width: 80 },
        { columnName: 'dateObs', width: 180 },
        { columnName: 'band', width: 80 },
        { columnName: 'exposureTime', width: 90 },
        { columnName: 'telescope', width: 100 },
        { columnName: 'instrument', width: 100 },
        { columnName: 'observer', width: 120 },
        { columnName: 'fileSize', width: 80 },
      ],
      tableColumnExtensions: [
        { columnName: 'detail', align: 'center' },
        { columnName: 'btnDownload', align: 'center' },
        { columnName: 'filename', align: 'left' },
        { columnName: 'target', align: 'left' },
        { columnName: 'ra', align: 'center' },
        { columnName: 'dec', align: 'center' },
        { columnName: 'dateObs', align: 'left' },
        { columnName: 'band', align: 'center' },
        { columnName: 'exposureTime', align: 'center' },
        { columnName: 'telescope', align: 'left' },
        { columnName: 'instrument', align: 'left' },
        { columnName: 'observer', align: 'left' },
        { columnName: 'fileSize', align: 'center' },
      ],
      sorting: [{ columnName: 'dateObs', direction: 'asc' }],
      // loading: true,
      selection: [],
      currentPage: 0
    }
  }

  renderButtonView = rowData => {
    const { classes } = this.props;
    if (rowData !== null) {

      return (
        <IconButton size="small" variant="contained" className={classes.button} onClick={() => this.onView(rowData)}  >
          <ZoomIn />
        </IconButton>
      );
    }

    return null;
  };

  renderButtonDownload = rowData => {
    const { toDownload } = this.props;
    if (rowData !== null) {

      var btnProps = {};

      if (findIndex(toDownload, function (el) {
        return el.filename === rowData.filename;
      }) !== -1) {
        btnProps.color = "secondary";
      }

      return (
        <IconButton size="small" variant="contained" onClick={() => this.props.handleAdd(rowData)} {...btnProps}>
          <GetAppIcon />
        </IconButton>
      );
    }

    return null;
  };

  onView = rowData => {
    this.props.onDetail(rowData);
  }

  changeSelection = selection => {
    // Neste caso a selecao e para uma linha apenas, 
    var selected_id, selectedRow;
    if (selection.length > 0) {
      // comparar a selecao atual com a anterior para descobrir qual
      // linha foi selecionado por ultimo
      let diff = selection.filter(x => !this.state.selection.includes(x));

      selection = diff
      selected_id = diff[0]
      selectedRow = this.props.rows[selected_id];

    } else {
      selection = [];
      selectedRow = null;
    }

    this.setState({
      selection, selectedRow,
    }, this.props.handleSelection(selectedRow))
  }

  changeCurrentPage = (currentPage) => {
    this.props.handleChangePage(currentPage);
    // this.setState({
    //   loading: true,
    // });
  }

  render() {
    const { rows, totalCount, pageSize, classes, loading } = this.props;
    const {
      columns,
      defaultColumnWidths,
      tableColumnExtensions,
      selection,
      currentPage,
    } = this.state;
     
    rows.map(row => {
      if (row.haveHeaders) {
        row.detail = this.renderButtonView(row);
      }
      row.btnDownload = this.renderButtonDownload(row);
      return row;
    })

    return (
      <Paper style={{ position: 'relative' }}>

      <Grid
        columns={columns}
        rows={rows}>

        <SortingState />
        <IntegratedSorting />

        <DateTypeProvider
          for={['dateObs']}
        />

        <SizeTypeProvider
          for={['fileSize']}
        />

        <SelectionState
          selection={selection}
          onSelectionChange={this.changeSelection}
        />

        <PagingState
          defaultCurrentPage={0}
          currentPage={currentPage}
          pageSize={pageSize}
          onCurrentPageChange={this.changeCurrentPage}
        />
        <CustomPaging
            totalCount={totalCount}
          />

        <Table columnExtensions={tableColumnExtensions} />
        <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
        <TableHeaderRow showSortingControls />
        <TableColumnVisibility />
        <TableSelection highlightRow={true} selectByRowClick={true} showSelectionColumn={false} />
        <PagingPanel />

        <Toolbar />
        <ColumnChooser />
      </Grid>
      { loading &&  <CircularProgress className={classes.progress}/> }
      </Paper>      
    );
  }
}

ResultGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleSelection: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  toDownload: PropTypes.array,
};
export default withStyles(styles)(ResultGrid);
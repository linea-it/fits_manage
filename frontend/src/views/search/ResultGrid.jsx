import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, Table, TableHeaderRow, ColumnChooser,
  TableColumnVisibility, Toolbar, TableColumnResizing,
} from '@devexpress/dx-react-grid-material-ui';
import {
  SortingState, IntegratedSorting,
  DataTypeProvider,
} from '@devexpress/dx-react-grid';
import moment from 'moment';
import filesize from 'filesize';

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


const styles = theme => ({})

class ResultGrid extends Component {

  state = this.initialState;

  get initialState() {
    return {
      columns: [
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
      sorting: [{ columnName: 'dateObs', direction: 'asc' }],
      loading: false,
    }
  }

  render() {
    // const { classes } = this.props;
    const { rows } = this.props;
    const {
      columns,
      defaultColumnWidths
    } = this.state;

    return (
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

        <Table />
        <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
        <TableHeaderRow showSortingControls />
        <TableColumnVisibility />

        <Toolbar />
        <ColumnChooser />
      </Grid>
    );
  }
}
export default withStyles(styles)(ResultGrid);
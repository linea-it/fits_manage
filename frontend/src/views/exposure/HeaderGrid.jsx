import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, Table, TableHeaderRow,
  Toolbar, TableColumnResizing,
  SearchPanel, VirtualTable
} from '@devexpress/dx-react-grid-material-ui';
import {
  SortingState, IntegratedSorting,
  SearchState, IntegratedFiltering
} from '@devexpress/dx-react-grid';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})



class HeaderGrid extends Component {

  state = this.initialState;

  get initialState() {
    return {
      columns: [
        { name: 'name', title: 'Header' },
        { name: 'value', title: 'Value' },
      ],
      defaultColumnWidths: [
        { columnName: 'name', width: 150 },
        { columnName: 'value', width: 220 },
      ],
      tableColumnExtensions: [
        { columnName: 'detail', align: 'left' },
        { columnName: 'filename', align: 'left' },
      ],

      sorting: [{ columnName: 'name', direction: 'asc' }],
      loading: false,
    }
  }

  render() {
    const { rows } = this.props;
    const {
      columns,
      defaultColumnWidths,
      tableColumnExtensions,
    } = this.state;

    const getRowId = row => row.name;

    return (
      <Grid
        columns={columns}
        rows={rows}
        getRowId={getRowId}
        >

        <SortingState />
        <IntegratedSorting />

        <SearchState />
        <IntegratedFiltering />

        <VirtualTable columnExtensions={tableColumnExtensions} />
        {/* <Table columnExtensions={tableColumnExtensions}/> */}
        <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
        <TableHeaderRow showSortingControls />

        <Toolbar />
        <SearchPanel />
      </Grid>
    );
  }
}
export default withStyles(styles)(HeaderGrid);
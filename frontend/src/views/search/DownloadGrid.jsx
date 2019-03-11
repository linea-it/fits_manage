import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, Table, TableHeaderRow, 
  TableColumnResizing, TableSummaryRow
} from '@devexpress/dx-react-grid-material-ui';
import {
  SortingState, IntegratedSorting,
  DataTypeProvider, SummaryState, IntegratedSummary, 
} from '@devexpress/dx-react-grid';
import moment from 'moment';
import filesize from 'filesize';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import PropTypes from 'prop-types'


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
})

class DownloadGrid extends Component {

  state = this.initialState;

  get initialState() {
    return {
      columns: [
        { name: 'filename', title: 'Filename' },
        { name: 'fileSize', title: 'Size' },
        { name: 'btnRemove', title: ' ' },
      ],
      defaultColumnWidths: [
        { columnName: 'filename', width: 340 },
        { columnName: 'fileSize', width: 200 },
        { columnName: 'btnRemove', width: 100 },
      ],
      tableColumnExtensions: [
        { columnName: 'filename', align: 'left'  },
        { columnName: 'fileSize', align: 'center' },
      ],
      totalSummaryItems: [
        { columnName: 'filename', type: 'count' },
        { columnName: 'fileSize', type: 'sum' },
      ],      
      sorting: [{ columnName: 'dateObs', direction: 'asc' }],
      loading: false,
    }
  }

  renderButtonRemove = rowData => {
    const {classes} = this.props; 

    if (rowData !== null) {
      return (
        <IconButton  size="small" variant="contained" className={classes.button} onClick={()=>this.props.handleRemove(rowData)}>
          <Delete />
        </IconButton>
      );
    }

    return null;
  };

  render() {
    const { rows } = this.props;
    const {
      columns,
      defaultColumnWidths,
      tableColumnExtensions,
      totalSummaryItems
    } = this.state;


    rows.map(row => {
      if (row.haveHeaders) {
        row.btnRemove = this.renderButtonRemove(row);
      }      
      return row;
    })

    return (
      <Grid
        columns={columns}
        rows={rows}>

        <SortingState />
        <IntegratedSorting />

        <SummaryState
            totalItems={totalSummaryItems}
          />
          <IntegratedSummary />

        <DateTypeProvider
            for={['dateObs']}
          />

        <SizeTypeProvider
          for={['fileSize']}
          />

        <Table columnExtensions={tableColumnExtensions}/>
        <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
        <TableHeaderRow showSortingControls />
        <TableSummaryRow />
      </Grid>
    );
  }
}

DownloadGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
  handleRemove: PropTypes.func.isRequired,
};
export default withStyles(styles)(DownloadGrid);
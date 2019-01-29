import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Grid, Table, TableHeaderRow, PagingPanel, ColumnChooser,
    TableColumnVisibility, Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import { PagingState, SortingState, CustomPaging } from '@devexpress/dx-react-grid';


const styles = theme => ({})

class ResultGrid extends Component {

    state = this.initialState;

    get initialState() {
        return {
            columns: [
                { name: 'ra_deg', title: 'RA (deg)' },
                { name: 'dec_deg', title: 'Dec (deg)' },
                { name: 'date_obs', title: 'Date Obs' },
                { name: 'target', title: 'Target' },
                { name: 'exptime', title: 'Exptime' },
                { name: 'filter', title: 'Filter' },
                { name: 'filename', title: 'Filename' },
            ],
            rows: [],
            totalCount: 0,
            pageSize: 15,
            pageSizes: [15, 25, 50, 100],
            currentPage: 0,
            sorting: [{ columnName: 'date_obs', direction: 'asc' }],
            filters: [],
            searchValue: '',
            loading: false
        }
    }

    componentDidMount() {
        this.loadData();
    }

    // componentDidUpdate() {
    //   this.loadData();
    // }

    changeSorting = sorting => {
        this.setState({
            sorting,
        }, () => {
            this.loadData()
        });
    }

    changeCurrentPage = currentPage => {
        // console.log("changeCurrentPage: ", currentPage)
        this.setState({
            currentPage,
        }, () => {
            this.loadData()
        });
    }

    changePageSize = (pageSize) => {
        const { totalCount, currentPage: stateCurrentPage } = this.state;
        const totalPages = Math.ceil(totalCount / pageSize);
        const currentPage = Math.min(stateCurrentPage, totalPages - 1);

        this.setState({
            pageSize,
            currentPage,
        }, () => {
            this.loadData()
        });
    }

    loadData = () => {
        console.log("Load Data")

        // this.setState({ loading: true });

        // let currentPage = this.state.currentPage;

        // this.api.getNfes({
        //     currentPage: (currentPage + 1),
        //     pageSize: this.state.pageSize,
        //     sorting: this.state.sorting,
        //     searchValue: this.state.searchValue
        //   }).then(res => {

        //     const r = res.data;

        //     this.setState({
        //       rows: r.rows,
        //       totalCount: r.totalCount,
        //       currentPage: r.currentPage - 1,
        //       // sizePerPage: sizePerPage,
        //       loading: false,
        //       // sortField: sortField,
        //       // sortOrder: sortOrder,
        //     });
        //   });

    }


    render() {

        // const { classes } = this.props;
        const {
            rows,
            columns,
            // currencyColumns,
            tableColumnExtensions,
            sorting,
            pageSize,
            pageSizes,
            currentPage,
            totalCount,
        } = this.state;

        return (
            <div>
                <Grid
                    columns={columns}
                    rows={rows}>
                    <SortingState
                        sorting={sorting}
                        onSortingChange={this.changeSorting}
                    />
                    <PagingState
                        currentPage={currentPage}
                        onCurrentPageChange={this.changeCurrentPage}
                        pageSize={pageSize}
                        onPageSizeChange={this.changePageSize}
                    />
                    <CustomPaging
                        totalCount={totalCount}
                    />
                    <Table
                        columnExtensions={tableColumnExtensions}
                    />
                    <TableHeaderRow showSortingControls />
                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                    <TableColumnVisibility />
                    <Toolbar />
                    <ColumnChooser />
                </Grid>
            </div >
        );
    }
}
export default withStyles(styles)(ResultGrid);
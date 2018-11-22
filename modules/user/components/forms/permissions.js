import React, {useState, useContext} from 'react';
import Paper from '@material-ui/core/Paper';
import { RowDetailState } from '@devexpress/dx-react-grid';
import {MembershipsContext} from 'containers/contexts'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';

const RowDetail = ({ row }) => (
  <div>
    Details for
    {' '}
    {row.label}
  </div>
);

const Demo = () => {
  const [expandedRowIds, setExpandedRowIds] = useState([])
  const columns = [
    { name: 'label', title: 'Name' },
  ]
  const {permissions} = useContext(MembershipsContext)

  return (
    <Paper>
      <Grid
        rows={permissions}
        columns={columns}
      >
        <RowDetailState
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={setExpandedRowIds}
        />
        <Table />
        <TableHeaderRow />
        <TableRowDetail
          contentComponent={RowDetail}
        />
      </Grid>
    </Paper>
  );
}

export default Demo
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

const RowDetail = ({ row }) => {
  const {
    id,
    name,
    permissions,
    memberships,
  } = row
  return (
    <div>
      Id: {id}
      Name: {name}
      Permissions: <pre>{JSON.stringify(permissions)}</pre>
      Memberships: <pre>{JSON.stringify(memberships)}</pre>
    </div>
  )
}

const Demo = () => {
  const [expandedRowIds, setExpandedRowIds] = useState([])
  const columns = [
    { id: 'id', title: 'Id'},
    { name: 'name', title: 'Name' },
  ]
  const {roles_details} = useContext(MembershipsContext)

  return (
    <Paper>
      <Grid
        rows={roles_details}
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
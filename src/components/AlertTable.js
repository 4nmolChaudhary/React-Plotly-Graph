import React from 'react'
import MaterialTable from 'material-table'
import { Paper } from '@material-ui/core'

function AlertTable({ alerts }) {
	const values = {
		columns: [
			{ title: 'Severity', field: 'severity' },
			{ title: 'Status', field: 'status' },
			{ title: 'Detected On', field: 'date' },
			{ title: 'Entity', field: 'ent' },
			{ title: 'Description', field: 'desc' },
		],
		data: [
			{
				severity: 'Critical',
				status: 'Pending',
				date: alerts[0],
				ent: 'R4.test',
				desc: 'This network element went offline',
			},
			{
				severity: 'Moderate',
				status: 'Pending',
				date: alerts[1],
				ent: 'R1.test',
				desc: 'This network element went offline',
			},
		],
	}

	return (
		<div className="table">
			<MaterialTable
				columns={values.columns}
				data={values.data}
				options={{
					search: false,
					paging: false,
				}}
				components={{
					Container: props => <Paper {...props} elevation={0} />,
					Toolbar: props => <div className="header">Alerts</div>,
					Header: props => (
						<thead className="tableheader">
							<tr>
								<th className="table-th">Severity</th>
								<th className="table-th">Status</th>
								<th className="table-th">Detected On</th>
								<th className="table-th">Entity</th>
								<th className="table-th">Description</th>
							</tr>
						</thead>
					),
				}}
			/>
		</div>
	)
}

export default AlertTable

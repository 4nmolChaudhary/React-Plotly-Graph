import React from 'react'
import MaterialTable from 'material-table'
import { Paper } from '@material-ui/core'

function TopInterfacebyUtilization() {
	const values = {
		columns: [
			{ title: 'Interface Name', field: 'port_name' },
			{ title: 'High/Low', field: 'hl' },
			{ title: 'Average', field: 'avg' },
			{ title: 'Connencted to', field: 'conn_to' },
		],
		data: [
			{
				port_name: 'FastEthernet0/0',
				hl: '94 Mbps/0 Mbps',
				avg: '54 Mbps',
				conn_to: 'FastEthernet0/0 on R4.test',
			},
			{
				port_name: 'FastEthernet0/1',
				hl: '97 Mbps/1 Mbps',
				avg: '62 Mbps',
				conn_to: 'FastEthernet0/1 on R6.test',
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
					Toolbar: props => <div className="header">Top Interfaces by Bandwith</div>,
					Header: props => (
						<thead className="tableheader">
							<tr>
								<th className="table-th">Interface Name</th>
								<th className="table-th">High/Low</th>
								<th className="table-th">Average</th>
								<th className="table-th">Connencted to</th>
							</tr>
						</thead>
					),
				}}
			/>
		</div>
	)
}

export default TopInterfacebyUtilization

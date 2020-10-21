import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import moment from 'moment'
import axios from 'axios'

function Graph2() {
	const [data, setData] = useState()

	useEffect(() => {
		;(async () => {
			const response = await axios.get(`http://192.168.1.51:9090/api/v1/query?query=ifInOctets{ifDescr=%22FastEthernet0/0%22,instance=%2210.1.1.1%22,job=%22snmp%22}[30d]`)
			const data = response.data.data.result[0].values
			const dates = []
			const values = []

			for (let i = 0; i < data.length; i++) {
				dates.push(moment.unix(data[i][0]).format('YYYY-MM-DD HH:mm:ss'))
				//values.push(data[i][1] / 1000000)
				values.push(Math.random() * 100)
			}
			console.log(dates)
			const trace1 = { type: 'scatter', mode: 'lines', fill: 'toself', hoveron: 'points+fills', name: 'if_in_octets', x: dates, y: values, fillcolor: '#b0b6fd', line: { color: '#636efa' }, showLegend: true }
			//const trace2 = { type: 'scatter', mode: 'lines', name: 'CPU', x: dates, y: dvals, line: { color: '#7F7F7F' } }
			// const trace3 = { type: 'scatter', mode: 'lines', name: 'Storage', x: date, y: storage, line: { color: '#00CCFF' } }
			setData([trace1])
		})()
	}, [])

	const Layout = {
		title: {
			text: 'Device Bandwidth',
			font: {
				family: 'GoogleSans-Bold',
				weight: 800,
				size: 22,
			},
			x: 0.0,
		},

		legend: { font: { family: 'GoogleSans-Regular', size: 12 }, legend: { orientation: 'h' } },
		xaxis: { autorange: true, type: 'dates', tickfont: { family: 'GoogleSans-Regular' } },
		yaxis: { autorange: true, range: [1, 100], type: 'linear', ticksuffix: ' Mbps', tickfont: { family: 'GoogleSans-Regular' } },
		width: 1000,
		height: 300,
		margin: { l: 60, r: 50, b: 50, t: 80, pad: 4 },
	}

	const config = {
		displaylogo: false,
	}
	return (
		<div>
			<Plot data={data} layout={Layout} config={config} />
		</div>
	)
}

export default Graph2

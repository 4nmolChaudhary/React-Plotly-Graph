import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import moment from 'moment'
import axios from 'axios'
import './graphStyles.css'

function Graph2() {
	const [data, setData] = useState()
	const [avgT, setAvgT] = useState()
	const [avgR, setAvgR] = useState()

	useEffect(() => {
		;(async () => {
			const response = await axios.get(`http://192.168.1.51:9090/api/v1/query?query=ifInOctets{ifDescr=%22FastEthernet0/0%22,instance=%2210.1.1.1%22,job=%22snmp%22}[3h]`)
			const data = response.data.data.result[0].values
			const dates = []
			const values = []
			const vals = []
			for (let i = 0; i < data.length; i++) {
				dates.push(moment.unix(data[i][0]).format('YYYY-MM-DD HH:mm:ss'))
				values.push(Math.random() * 100)
				vals.push(Math.random() * 100)
			}
			console.log(dates)
			const alert = [dates[12], Math.max(...values), dates[30], 45]
			const anomaly = [dates[17], values[17]]
			console.log(alert)
			setAvgR(
				values.reduce(function (sum, a) {
					return sum + a
				}, 0) / (values.length || 1)
			)
			setAvgT(
				vals.reduce(function (sum, a) {
					return sum + a
				}, 0) / (vals.length || 1)
			)
			//fill: 'toself', hoveron: 'points+fills',fillcolor: '#b0b6fd'
			const trace1 = { type: 'scatter', mode: 'lines', name: 'Receive', x: dates, y: values, line: { color: '#636efa' } }
			const trace2 = { type: 'scatter', mode: 'lines', name: 'Transmit', x: dates, y: vals, line: { color: '#17cc96' } }
			const trace4 = { type: 'scatter', mode: 'markers', name: 'Anomaly', x: [anomaly[0]], y: [anomaly[1]], marker: { color: '#FFBA08', size: 8, line: { color: '#121212', width: 2 } } }
			const trace3 = { type: 'bar', width: 8, name: 'Alert', x: [alert[0], alert[2]], y: [alert[1], alert[3]], marker: { color: ' #eaa099', line: { dash: 'dot', color: '#EB5160', width: 15 } } }
			setData([trace1, trace2, trace3, trace4])
		})()
	}, [])

	const rangeselector = { buttons: [{ count: 1, label: '1m', step: 'month', stepmode: 'backward' }, { count: 6, label: '6m', step: 'month', stepmode: 'backward' }, { step: 'all' }] }

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
		xaxis: { autorange: true, type: 'dates', tickfont: { family: 'GoogleSans-Regular' }, rangeselector: rangeselector, rangeslider: { range: ['2020-10-21 14:43:23', '2020-10-21 14:51:23'] }, range: ['2020-10-21 14:43:23', '2020-10-21 14:51:23'] },
		yaxis: { autorange: true, range: [1, 100], type: 'linear', ticksuffix: ' Mbps', tickfont: { family: 'GoogleSans-Regular' } },
		width: 1000,
		height: 400,
		margin: { l: 60, r: 50, b: 50, t: 80, pad: 4 },
	}

	const config = {
		displaylogo: false,
	}
	return (
		<div>
			<div className="device_bandwidth_graph">
				<Plot data={data} layout={Layout} config={config} />
			</div>
			<div className="gauges">
				<div className="gauge">
					Average Transmit <span style={{ color: '#17cc96' }}>{Math.round(avgT)} Mbps</span>
				</div>
				<div className="gauge">
					Average Receive <span style={{ color: '#636efa' }}>{Math.round(avgR)} Mbps</span>
				</div>
			</div>
		</div>
	)
}

export default Graph2

import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import moment from 'moment'
import axios from 'axios'
import './graphStyles.css'
import TroubleShootingView from './TroubleShootingView'

function Graph2() {
	const [data, setData] = useState()
	const [avgT, setAvgT] = useState()
	const [avgR, setAvgR] = useState()
	const [open, setOpen] = useState(false)

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

			const alert = [dates[12], Math.max(...values), dates[30], 45]
			const anomaly = [dates[17], values[17]]

			setAvgR(values.reduce((sum, a) => sum + a, 0) / (values.length || 1))
			setAvgT(vals.reduce((sum, a) => sum + a, 0) / (vals.length || 1))

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
		xaxis: { autorange: true, type: 'dates', tickfont: { family: 'GoogleSans-Regular' }, rangeselector: rangeselector, rangeslider: {} },
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
				<button className="expand-button" onClick={() => setOpen(true)}>
					<svg className="w-6 h-6" fill="#000" stroke="#000" viewBox="0 0 24 24" height="24px" width="24px">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
					</svg>
				</button>
			</div>
			<div className="gauges">
				<div className="gauge">
					Average Transmit <span style={{ color: '#17cc96' }}>{Math.round(avgT)} Mbps</span>
				</div>
				<div className="gauge">
					Average Receive <span style={{ color: '#636efa' }}>{Math.round(avgR)} Mbps</span>
				</div>
			</div>
			<TroubleShootingView open={open} onClose={() => setOpen(false)} data={data} avgT={avgT} avgR={avgR} config={config} rangeselector={rangeselector} />
		</div>
	)
}

export default Graph2

import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import Data from '../data/Data.json'

function Graph1() {
	const [data, setData] = useState()

	useEffect(() => {
		;(async () => {
			const dates = Data.map(instance => {
				const x = new Date(instance.Date.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3'))
				return x.toISOString().split('T')[0]
			})
			const bandwidth = Data.map(instance => instance.bandwidth)
			const transmit = Data.map(instance => instance.Transmit)
			const rec = Data.map(instance => instance.Receive)
			const trace1 = { type: 'scatter', mode: 'lines', name: 'Bandwidth', x: dates, y: bandwidth, line: { color: '#17BECF' } }
			const trace2 = { type: 'scatter', mode: 'lines', name: 'Receive', x: dates, y: rec, line: { color: '#7F7F7F' } }
			const trace3 = { type: 'scatter', mode: 'lines', name: 'Transmit', x: dates, y: transmit, line: { color: '#00CCFF' } }
			setData([trace1, trace2, trace3])
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
		legend: { font: { family: 'GoogleSans-Regular', size: 12 } },
		xaxis: { autorange: true, range: ['2015-02-17', '2017-02-16'], tickfont: { family: 'GoogleSans-Regular' }, rangeselector: { buttons: [{ count: 1, label: '1m', step: 'month', stepmode: 'backward' }, { count: 6, label: '6m', step: 'month', stepmode: 'backward' }, { step: 'all' }] }, rangeslider: { range: ['2015-02-17', '2017-02-16'] }, type: 'date' },
		yaxis: { autorange: true, type: 'linear', ticksuffix: ' bps', tickfont: { family: 'GoogleSans-Regular' } },
		width: 1200,
		height: 400,
		margin: { l: 60, r: 50, b: 0, t: 100, pad: 4 },
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

export default Graph1

import React from 'react'
import Modal from '@material-ui/core/Modal'
import Plot from 'react-plotly.js'
import TopInterfacebyUtilization from './TopInterfacebyUtilization'
import AlertTable from './AlertTable'

function TroubleShootingView({ open, onClose, data, rangeselector, avgR, avgT }) {
	const Layout = {
		title: {
			text: 'Device Bandwidth',
			font: {
				family: 'GoogleSans-Bold',
				weight: 800,
				size: 22,
			},
			x: 0.02,
		},
		legend: { font: { family: 'GoogleSans-Regular', size: 12, fontWeight: 900 }, legend: { orientation: 'h' } },
		xaxis: { autorange: true, type: 'dates', tickfont: { family: 'GoogleSans-Regular', fontWeight: 900 }, rangeselector: rangeselector, rangeslider: {} },
		yaxis: { autorange: true, range: [1, 100], type: 'linear', ticksuffix: ' Mbps', tickfont: { family: 'GoogleSans-Regular', fontWeight: 900 } },
		width: document.documentElement.clientWidth * 0.85,
		height: document.documentElement.clientWidth * 0.22,
		margin: { l: 100, r: 50, b: 50, t: 80, pad: 14 },
	}

	const config = {
		displaylogo: false,
	}

	return (
		<Modal open={open} onClose={onClose} className="modal">
			<div className="troubleshooting-modal">
				<div className="header" style={{ width: document.documentElement.clientWidth * 0.85 }}>
					<div className="flex">
						<svg height="28px" viewBox="0 0 512 512" width="28px" xmlns="http://www.w3.org/2000/svg">
							<path d="m256 512c140.960938 0 256-115.050781 256-256 0-140.960938-115.050781-256-256-256-140.960938 0-256 115.050781-256 256 0 140.960938 115.050781 256 256 256zm-146.859375-84.367188c36.839844-41.320312 90.71875-65.632812 146.859375-65.632812s110.019531 24.3125 146.859375 65.632812c-39.527344 33.871094-90.84375 54.367188-146.859375 54.367188s-107.332031-20.496094-146.859375-54.367188zm-18.457031-186.632812c3.109375-34.523438 16.824218-66.035156 37.867187-91.234375l20.382813 20.382813 21.214844-21.214844-20.382813-20.382813c25.199219-21.042969 56.710937-34.757812 91.234375-37.867187v29.316406h30v-29.316406c34.523438 3.109375 66.035156 16.824218 91.234375 37.867187l-20.382813 20.382813 21.214844 21.214844 20.382813-20.382813c21.039062 25.199219 34.757812 56.710937 37.867187 91.234375h-29.316406v29.988281h29.308594c-3.265625 36.140625-18.234375 70.441407-42.4375 97.089844-37.378906-24.0625-80.410156-36.078125-122.871094-36.078125-42.371094 0-85.414062 11.964844-122.871094 36.078125-24.203125-26.648437-39.171875-60.941406-42.4375-97.078125h29.308594v-30zm165.316406-211c124.617188 0 226 101.382812 226 226 0 57.816406-21.832031 110.621094-57.675781 150.632812-6.605469-7.316406-13.722657-14.199218-21.265625-20.609374 31.269531-35.53125 48.941406-82.023438 48.941406-130.023438 0-107.636719-88.351562-196-196-196-107.636719 0-196 88.351562-196 196 0 48 17.671875 94.492188 48.941406 130.023438-7.542968 6.410156-14.660156 13.292968-21.265625 20.609374-35.84375-40.011718-57.675781-92.816406-57.675781-150.632812 0-124.617188 101.382812-226 226-226zm0 0" />
							<path d="m211 392h90v30h-90zm0 0" />
							<path d="m217.558594 279.398438c8.242187 13.527343 22.613281 21.601562 38.441406 21.601562 24.8125 0 45-20.1875 45-45 0-15.828125-8.074219-30.199219-21.601562-38.441406l-.773438-.472656-112.839844-51.296876 51.300782 112.835938zm46.863281-35.816407c4.132813 2.804688 6.578125 7.390625 6.578125 12.417969 0 8.269531-6.730469 15-15 15-5.027344 0-9.613281-2.445312-12.417969-6.578125l-17.367187-38.210937zm0 0" />
						</svg>
						<h2>Device Bandwidth ( Trouble Shooting View )</h2>
					</div>

					<svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
						<path fill="none" d="M0 0h24v24H0z" />
						<path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
					</svg>
				</div>
				<Plot data={data} layout={Layout} config={config} />
				<div className="gauges" style={{ width: document.documentElement.clientWidth * 0.85 }}>
					<div className="gauge">
						Average Transmit <span style={{ color: '#17cc96' }}>{Math.round(avgT)} Mbps</span>
					</div>
					<div className="gauge">
						Average Receive <span style={{ color: '#636efa' }}>{Math.round(avgR)} Mbps</span>
					</div>
				</div>
				<div style={{ width: document.documentElement.clientWidth * 0.85 }}>
					<TopInterfacebyUtilization />
				</div>
				<div style={{ width: document.documentElement.clientWidth * 0.85 }}>
					<AlertTable alerts={data?.[2]?.x} />
				</div>
			</div>
		</Modal>
	)
}

export default TroubleShootingView

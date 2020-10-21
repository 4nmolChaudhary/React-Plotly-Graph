import React from 'react'
import './App.css'
// import axios from 'axios'
// import Graph1 from './components/Graph1'
// import moment from 'moment'
import Graph2 from './components/Graph2'
import Graph3 from './components/Graph3'

function App() {
	// useEffect(() => {
	// 	;(async () => {
	// 		const response = await axios.get(`http://192.168.1.51:9090/api/v1/query?query=ifSpeed%7BifDescr=%22FastEthernet0/0%22,instance=%2210.1.1.1%22,job=%22snmp%22%7D[60d]`)
	// 		const data = response.data.data.result[0].values
	// 		console.log(data[0][0])
	// 		const dates = []
	// 		const values = []
	// 		for (let i = 0; i < data.length; i++) {
	// 			dates.push(`${moment.unix(data[i][0]).format().split('T')[0]} ${moment.unix(data[i][0]).format().split('T')[1].split('+')[0]}`)
	// 			values.push(data[i][1])
	// 		}
	// 		console.log(dates, values)
	// 	})()
	// }, [])

	return (
		<div className="App">
			{/* <Graph1 /> */}
			<Graph2 />
			<Graph3 />
		</div>
	)
}

export default App

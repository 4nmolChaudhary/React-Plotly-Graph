import React, { useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
	useEffect(() => {
		;(async () => {
			const response = await axios.get(`http://192.168.1.51:9090/api/v1/query?query=ifSpeed&start=2020-06-01T20:10:30.781Z&end=2020-10-19T20:11:00.781Z`)
			console.log(response.data)
		})()
	}, [])

	return (
		<div className="App">
			<h1>Graph Testing</h1>
		</div>
	)
}

export default App

import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import Plotly from 'plotly.js'

function Graph2() {
  const [data, setData] = useState()

  useEffect(() => {
    ;(async () => {
      Plotly.d3.csv('https://raw.githubusercontent.com/4nmolChaudhary/Assets/master/utilization.csv', function (data) {
        processData(data)
      })

      function processData(Data) {
        // const date = Data.map(instance => {
        //   //console.log(instance.date.split(' ')[0])
        //   const x = new Date(instance.date)
        //   return x.toISOString().split('.')[0].split('T').join(' ')
        // })
        // const date = ['2013-10-04 22:23:00', '2013-10-04 22:24:00', '2013-10-04 22:25:00']
        // const mem = [1, 2, 3] //Data.map(instance => instance.mem)
        // const cpu = [1, 5, 7] //Data.map(instance => instance.cpu)
        // const storage = [4, 9, 5] //Data.map(instance => instance.storage)
        // console.log(date)
        // const trace1 = { type: 'scatter', mode: 'lines', name: 'Memory', x: date, y: mem, line: { color: '#17BECF' } }
        // const trace2 = { type: 'scatter', mode: 'lines', name: 'CPU', x: date, y: cpu, line: { color: '#7F7F7F' } }
        // const trace3 = { type: 'scatter', mode: 'lines', name: 'Storage', x: date, y: storage, line: { color: '#00CCFF' } }
        // setData([trace1, trace2, trace3])
        setData([
          {
            x: ['1462060800000', '1462147200000', '1462233600000'],
            y: [1, 3, 6],
            type: 'scatter',
          },
        ])
      }
    })()
  }, [])

  const Layout = {
    title: {
      text: 'Device Utilization',
      font: {
        family: 'GoogleSans-Bold',
        weight: 800,
        size: 22,
      },
      x: 0.0,
    },
    legend: { font: { family: 'GoogleSans-Regular', size: 12 } },
    xaxis: { autorange: true, type: 'linear', tickfont: { family: 'GoogleSans-Regular' } },
    yaxis: { autorange: true, type: 'linear', ticksuffix: ' %', tickfont: { family: 'GoogleSans-Regular' } },
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

export default Graph2

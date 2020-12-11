import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CanvasJSChart } from 'canvasjs-react-charts';

import './style.css';

function Home(props) {
  const lineChart = useSelector((state) => {
    let list = [];
    for (let i = 0; i < state.linechartRedcuer.lineChart.data.length; i++) {
      const data = state.linechartRedcuer.lineChart.data[i]
        .sort((a, b) => a.month - b.month)
        .sort((a, b) => a.year - b.year)
        .map((f, i) => ({
          x: i,
          y: f.percentage,
          count: f.count,
          label: `${f.month > 8 ? f.month + 1 : '0' + (f.month + 1)}/${f.year}`,
          name: f.language,
        }));
      list.push(data);
    }
    return list;
  });

  const options = {
    animationEnabled: true,
    theme: 'light2', // "light1", "dark1", "dark2"
    axisY: {
      title: 'Language mentions %',
      interval: 5,
      suffix: '%',
    },
    axisX: {
      interval: 7,
    },
    data: lineChart.map((f) => ({
      type: 'spline',
      toolTipContent: '{name}: {y}% - {count} mentions - {label}',
      dataPoints: f,
    })),
  };

  React.useEffect(() => {}, []);

  return (
    <div>{lineChart.length > 0 && <CanvasJSChart options={options} />}</div>
  );
}

export default Home;

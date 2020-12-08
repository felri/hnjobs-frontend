import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'utils/api';
import { CanvasJSChart } from 'canvasjs-react-charts';

import types from 'store/types';

import './style.css';

function Home(props) {
  const dispatch = useDispatch();

  const { year, month } = useSelector((state) => state.piechartReducer);

  const pieChart = useSelector((state) =>
    state.piechartReducer.pieChart.data
      .filter((f) => f.result > 20)
      .map((f) => ({
        label: f.name,
        y: f.result,
        percentage: f.percentage,
      }))
  );

  const options = {
    animationEnabled: true,
    theme: 'light2',
    axisY: {
      title: 'Language mentions',
      includeZero: false,
    },
    axisX: {
      interval: 1,
      reversed: true,
    },
    data: [
      {
        click: function (e) {
          console.log(e);
        },
        toolTipContent: '{label}: {percentage}% - {y} mentions',
        type: 'bar',
        dataPoints: pieChart,
      },
    ],
  };

  React.useEffect(() => {}, []);

  return (
    <div>{pieChart.length > 0 && <CanvasJSChart options={options} />}</div>
  );
}

export default Home;

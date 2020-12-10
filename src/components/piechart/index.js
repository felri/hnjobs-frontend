import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'utils/api';
import { CanvasJSChart } from 'canvasjs-react-charts';

import helpers from 'utils/helpers';
import types from 'store/types';

import './style.css';

function Home(props) {
  const dispatch = useDispatch();

  const { year, month } = useSelector((state) => state.piechartReducer);

  const pieChart = useSelector((state) =>
    state.piechartReducer.pieChart.data
      .filter((f) => f.result > 10)
      .map((f) => ({
        label: f.name,
        fill: helpers.generateRandomColor(),
        y: f.percentage,
        count: f.result,
      }))
  );

  const options = {
    animationEnabled: true,
    data: [
      {
        click: function (e) {
          dispatch({ type: types.SET_SEARCH, payload: e.dataPoint.label });
        },
        type: 'pie',
        toolTipContent: '{label}: {y}% - {count} mentions',
        indexLabel: '{label}: {y}%',
        startAngle: -90,
        dataPoints: pieChart,
      },
    ],
  };

  const getPieChart = async () => {
    dispatch({ type: types.SET_PIE_CHART_LOADING });
    try {
      const data = await api.getPieChart({ year, month });
      if (data.error) dispatch({ type: types.SET_PIE_CHART_ERROR });
      else {
        dispatch({ type: types.SET_PIE_CHART, payload: data });
      }
    } catch (e) {
      console.log(e);
      dispatch({ type: types.SET_PIE_CHART_ERROR });
    }
  };

  React.useEffect(() => {}, []);

  return (
    <div>{pieChart.length > 0 && <CanvasJSChart options={options} />}</div>
  );
}

export default Home;

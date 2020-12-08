import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PieChart from 'components/piechart';
import BarChart from 'components/barchart';
import LineChart from 'components/linechart';
import DropDown from 'components/dropDown';
import Header from 'components/header';
import Jobs from 'components/jobs';
import DropDownLanguages from 'components/dropDownLanguages';
import Loading from 'components/loading';

import controller from 'controllers/chartsController';

import './style.css';

const BuiltBy = () => (
  <div
    onClick={() => window.open('https://felri.site', '_blank')}
    className='built-by'
  >
    built by me
  </div>
);

const Languages = ({ languages }) => (
  <div className='container-language-list'>
    {languages.length > 0 &&
      languages.map((item, index) => (
        <div className='language-selected' key={index}>
          {item} {index !== languages.length - 1 && ' - '}
        </div>
      ))}
  </div>
);

function Home(props) {
  const dispatch = useDispatch();

  const {
    typeChart: pieTypeChart,
    loading: loadingPie,
    year: yearPie,
    month: monthPie,
  } = useSelector((state) => state.piechartReducer);
  const {
    loading: loadingLine,
    languages,
    year: yearLine,
    month: monthLine,
  } = useSelector((state) => state.linechartRedcuer);

  React.useEffect(() => {
    controller.getPieChart(dispatch, yearPie, monthPie);
    controller.getJobs(dispatch, yearPie, monthPie);
  }, [yearPie, monthPie]);

  React.useEffect(() => {
    controller.getLineChart(dispatch, yearLine, monthLine, languages);
  }, [languages]);

  return (
    <>
      <Header />
      <div className='container'>
        <div className='container-chart'>
          <DropDown />
          {loadingPie ? (
            <Loading />
          ) : pieTypeChart === 'pie' ? (
            <PieChart />
          ) : (
            <BarChart />
          )}
        </div>
        <div className='container-chart'>
          <DropDownLanguages />
          <Languages languages={languages} />
          {loadingLine ? <Loading /> : <LineChart />}
        </div>
        <Jobs />
        <div className='scroll-top-div' />
      </div>
      <BuiltBy />
    </>
  );
}

export default Home;

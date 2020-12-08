import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Btn from 'components/btn';
import { Years, Months } from 'utils/wordlist';
import types from 'store/types';

import { BarChartSvg, PieChartSvg, ArrowDownSvg } from 'assets/svg';

import './style.css';

const Options = ({ month, year, onApply }) => {
  const [selectedYear, setSelectedYear] = React.useState(year);
  const [selectedMonth, setSelectedMonth] = React.useState(month);

  return (
    <div className='container-options'>
      <div className='container-options-inside'>
        <div className='container-years-months'>
          {Months.map((item, index) => (
            <div
              onClick={() => setSelectedMonth(index)}
              key={index}
              className='months'
              style={{
                textDecoration: index === selectedMonth ? 'underline' : 'none',
                fontWeight: index === selectedMonth ? '800' : '500',
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <div className='container-years-months'>
          {Years.map((item, index) => (
            <div
              onClick={() => setSelectedYear(item)}
              key={index}
              className='years'
              style={{
                textDecoration: item === selectedYear ? 'underline' : 'none',
                fontWeight: item === selectedYear ? '800' : '500',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <Btn onClick={() => onApply({ selectedMonth, selectedYear })}>Apply</Btn>
    </div>
  );
};

function DropDown(props) {
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch();

  const { year, month } = useSelector((state) => state.piechartReducer);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const onApply = ({ selectedMonth, selectedYear }) => {
    setShowModal(!showModal);
    dispatch({
      type: types.SET_DATE_PIE_CHART,
      payload: {
        year: selectedYear,
        month: selectedMonth,
      },
    });
  };

  const onClickChartType = (option) => {
    dispatch({
      type: types.SET_CHART_TYPE_PIE,
      payload: option,
    });
  };

  React.useEffect(() => {}, []);

  return (
    <div className='container-options-dropdown'>
      <div className=' years container-btn-modal'>
        <div className='container-open-dropdown' onClick={handleModal}>
          {Months[month]} {year} <ArrowDownSvg height={15} />
        </div>
      </div>
      {!props.inHeader && (
        <div className='container-svg-dropdown'>
          <div
            className='svg-dropdown-option'
            onClick={() => onClickChartType('bar')}
          >
            <BarChartSvg style={{ height: '30px' }} fill={'#3d405b'} />
          </div>
          <div
            className='svg-dropdown-option'
            onClick={() => onClickChartType('pie')}
          >
            <PieChartSvg style={{ height: '30px' }} fill={'#3d405b'} />
          </div>
        </div>
      )}
      {showModal && <Options year={year} month={month} onApply={onApply} />}
    </div>
  );
}

export default DropDown;

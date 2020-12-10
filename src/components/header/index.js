import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import types from 'store/types';
import DropDown from 'components/dropDown';

import './style.css';

const Regex = ({ value, onChange }) => (
  <input
    className='container-input-regex'
    placeholder='Search'
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

function Header(props) {
  const [text, setText] = React.useState('');
  const [value] = useDebounce(text, 600);
  const dispatch = useDispatch();
  const { year, month } = useSelector((state) => state.piechartReducer);

  React.useEffect(() => {
    dispatch({ type: types.SET_SEARCH, payload: text });
  }, [value]);

  React.useEffect(() => {
    setText('');
  }, [year, month]);

  const onChange = (value) => {
    setText(value);
  };

  return (
    <div className='container-header'>
      <div className='title-header'>HN Jobs</div>
      <div className='container-dropdown-header'>
        <DropDown inHeader={true} />
      </div>
      <Regex onChange={onChange} value={text} />
    </div>
  );
}

export default Header;

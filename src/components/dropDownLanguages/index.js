import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Btn from 'components/btn';
import wordlist from 'utils/wordlist';
import types from 'store/types';
import { useRefresh } from 'react-tidy';

import { ArrowDownSvg } from 'assets/svg';

import './style.css';

const Options = ({ languages, onApply }) => {
  const [selectedLanguages, setSelectedLanguages] = React.useState(languages);
  const refresh = useRefresh();

  const handleLanguages = (item) => {
    const aux = selectedLanguages;
    const index = aux.indexOf(item);
    if (index > -1) {
      aux.splice(index, 1);
    } else {
      aux.push(item);
    }
    setSelectedLanguages(aux);
    refresh();
  };

  return (
    <div className='container-options-languages'>
      <div className='container-options-inside-languages'>
        {wordlist.map((item, index) => (
          <div
            onClick={() => handleLanguages(item)}
            key={index}
            className='job'
            style={{
              textDecoration: selectedLanguages.includes(item)
                ? 'underline'
                : 'none',
              fontWeight: selectedLanguages.includes(item) ? '800' : '500',
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Btn onClick={() => onApply({ languagesModal: selectedLanguages })}>
          Apply
        </Btn>
      </div>
    </div>
  );
};

function DropDown(props) {
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch();

  const { languages } = useSelector((state) => state.linechartRedcuer);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const onApply = ({ languagesModal }) => {
    setShowModal(!showModal);
    dispatch({
      type: types.SET_LINE_LANGUAGES,
      payload: languagesModal,
    });
  };

  React.useEffect(() => {}, []);

  return (
    <div className='container-options-dropdown'>
      <div className=' years container-btn-modal'>
        <div></div>
        <div className='container-open-dropdown-language' onClick={handleModal}>
          Languages - Frameworks - Databases <ArrowDownSvg height={15} />
        </div>
      </div>
      {showModal && <Options languages={languages} onApply={onApply} />}
    </div>
  );
}

export default DropDown;

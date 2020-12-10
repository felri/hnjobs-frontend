import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import types from 'store/types';
import Loading from 'components/loading';
import parse from 'html-react-parser';
import { Months } from 'utils/wordlist';
import { CloseSvg } from 'assets/svg';

import './style.css';

const Job = ({ job, search }) => (
  <>
    <div className='container-job'>
      <Languages languages={job.languages} search={search} />
      {job.text.length > 0 && parse(job.text)}
      <div
        className='language-selected-in-jobs by'
        onClick={() =>
          window.open(
            'https://news.ycombinator.com/user?id=' + job.by,
            '_blank'
          )
        }
      >
        by: {job.by}
      </div>
    </div>
  </>
);

const Languages = ({ languages, search }) => (
  <div className='container-language-list-in-jobs'>
    {languages.length > 0 &&
      languages.map((item, index) => (
        <div className='language-selected-in-jobs' key={index}>
          <span
            style={{
              backgroundColor:
                search.toUpperCase() === item.toUpperCase()
                  ? 'yellow'
                  : 'white',
            }}
          >
            {item}
          </span>{' '}
          {index !== languages.length - 1 && ' - '}{' '}
        </div>
      ))}
  </div>
);

function Jobs(props) {
  const { jobs, loading, search } = useSelector((state) => state.jobsReducer);
  const { year, month } = useSelector((state) => state.piechartReducer);
  const jobRef = React.useRef(null);

  const dispatch = useDispatch();

  const cleanSearch = () => {
    dispatch({ type: types.SET_SEARCH, payload: '' });
  };

  React.useEffect(() => {
    if (search.length > 0)
      jobRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [search]);

  return (
    <div className='container-jobs'>
      <div className='title-jobs' ref={jobRef}>
        {jobs.length > 0 && jobs.length} Jobs in {Months[month]} {year}
      </div>
      <div className='search-text-jobs'>
        {search.length > 0 && (
          <div className='text-filter'>
            with the word <span className='bold search-term'> {search}</span>
            <div onClick={cleanSearch} className='remove-filter'>
              <CloseSvg width={12} />
            </div>
          </div>
        )}
      </div>
      {loading && (
        <div className='container-loading-jobs'>
          <Loading />
        </div>
      )}
      {jobs.length > 0 &&
        jobs.map((item, index) => (
          <Job key={index} job={item} search={search} />
        ))}
    </div>
  );
}

export default Jobs;

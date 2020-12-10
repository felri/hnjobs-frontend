import types from 'store/types';

const initialState = {
  error: false,
  loading: true,
  jobs: [],
  allJobs: [],
  search: '',
};

function fixRegexText(search, job) {
  if (search === 'C++' && job) return job.split('+').join('plus');
  else if (search === 'C#' && job) return job.split('#').join('sharp');
  else return job;
}

function fixRegexSearch(search) {
  if (search === 'C++') return 'Cplusplus';
  else if (search === 'C#') return 'Csharp';
  else return search;
}

const filterJobs = (job, search) => {
  const regex = new RegExp(`${fixRegexSearch(search)}`, 'i');
  return regex.exec(fixRegexText(search, job)) !== null;
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_JOBS:
      return {
        ...state,
        error: false,
        loading: false,
        jobs: action.payload,
        allJobs: action.payload,
      };
    case types.SET_JOBS_LOADING:
      return {
        ...state,
        loading: true,
        jobs: [],
      };
    case types.SET_JOBS_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case types.SET_SEARCH:
      return {
        ...state,
        search: action.payload,
        jobs: state.allJobs.filter((f) => filterJobs(f.text, action.payload)),
      };
    default:
      return state;
  }
}

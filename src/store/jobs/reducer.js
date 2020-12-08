import types from 'store/types';

const initialState = {
  error: false,
  loading: true,
  jobs: [],
  allJobs: [],
  search: '',
};

const filterJobs = (job, search) => {
  const regex = new RegExp(`${search}`, 'i');
  return regex.exec(job) !== null;
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

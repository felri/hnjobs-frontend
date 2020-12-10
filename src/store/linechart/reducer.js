import types from 'store/types';

const initialState = {
  error: false,
  loading: true,
  lineChart: {
    data: [],
  },
  languages: ['React', 'JavaScript', 'TypeScript', 'Python'],
  month: '0',
  year: 2018,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_LINE_CHART:
      return {
        ...state,
        error: false,
        loading: false,
        lineChart: {
          data: action.payload,
        },
      };
    case types.SET_LINE_CHART_LOADING:
      return {
        ...state,
        loading: true,
        lineChart: {
          ...state.lineChart,
        },
      };
    case types.SET_LINE_CHART_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        lineChart: {
          data: [],
        },
      };
    case types.SET_LINE_LANGUAGES:
      return {
        ...state,
        languages: JSON.parse(JSON.stringify(action.payload)),
      };
    default:
      return state;
  }
}

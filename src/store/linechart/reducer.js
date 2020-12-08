import types from 'store/types';

const DEFAULT_DATE = new Date();
DEFAULT_DATE.setDate(DEFAULT_DATE.getDate() - 1065);

const initialState = {
  error: false,
  loading: true,
  lineChart: {
    data: [],
  },
  languages: ['JavaScript', 'TypeScript', 'Python'],
  month: DEFAULT_DATE.getMonth(),
  year: DEFAULT_DATE.getFullYear(),
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

import types from 'store/types';

const initialState = {
  pieChart: {
    error: false,
    loading: true,
    data: [],
  },
  typeChart: 'bar',
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_PIE_CHART:
      return {
        ...state,
        loading: false,
        error: false,
        pieChart: {
          data: action.payload,
        },
      };
    case types.SET_DATE_PIE_CHART:
      return {
        ...state,
        month: action.payload.month,
        year: action.payload.year,
      };
    case types.SET_CHART_TYPE_PIE:
      return {
        ...state,
        typeChart: action.payload,
      };
    case types.SET_PIE_CHART_LOADING:
      return {
        ...state,
        loading: true,
        pieChart: {
          ...state.pieChart,
        },
      };
    case types.SET_PIE_CHART_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        pieChart: {
          data: [],
        },
      };
    default:
      return state;
  }
}

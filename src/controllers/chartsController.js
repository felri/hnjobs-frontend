import types from 'store/types';
import api from 'utils/api';

const getPieChart = async (dispatch, year, month) => {
  dispatch({ type: types.SET_PIE_CHART_LOADING });
  dispatch({ type: types.SET_JOBS_LOADING });
  try {
    const data = await api.getPieChart({ year, month });
    if (data.error) dispatch({ type: types.SET_PIE_CHART_ERROR });
    else {
      dispatch({ type: types.SET_PIE_CHART, payload: data });
      getJobs(dispatch, year, month);
    }
  } catch (e) {
    console.log(e);
    dispatch({ type: types.SET_PIE_CHART_ERROR });
  }
};

const getJobs = async (dispatch, year, month) => {
  try {
    const data = await api.getJobsFromMonthLanguage({ year, month });
    if (data.error) dispatch({ type: types.SET_JOBS_ERROR });
    else {
      dispatch({ type: types.SET_JOBS, payload: data });
    }
  } catch (e) {
    console.log(e);
    dispatch({ type: types.SET_JOBS_ERROR });
  }
};

const getLineChart = async (dispatch, year, month, languages) => {
  dispatch({ type: types.SET_LINE_CHART_LOADING });
  try {
    const data = await api.getLineChart({
      year,
      month,
      arrayLanguages: languages,
    });
    if (data.error) dispatch({ type: types.SET_LINE_CHART_ERROR });
    else {
      dispatch({ type: types.SET_LINE_CHART, payload: data });
    }
  } catch (e) {
    console.log(e);
    dispatch({ type: types.SET_LINE_CHART_ERROR });
  }
};

export default {
  getPieChart,
  getLineChart,
};

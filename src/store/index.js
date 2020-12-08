import { combineReducers } from 'redux';
import piechartReducer from './piechart/reducer';
import linechartRedcuer from './linechart/reducer';
import jobsReducer from './jobs/reducer';

const rootReducer = combineReducers({
  piechartReducer,
  linechartRedcuer,
  jobsReducer,
});

export default rootReducer;

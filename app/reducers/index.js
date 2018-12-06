import { combineReducers } from 'redux';
import timeLineReducer from './timeLineReducer'
import trendsReducer from './trendsReducer'
import searchTweetsReducer from './searchTweetsReducer'
import settingsReducer from './settingsReducer'
import timelineForUserReducer  from './timelineForUserReducer'

const AppReducer = combineReducers({
  timeLineReducer,
  searchTweetsReducer,
  trendsReducer,
  settingsReducer,
  timelineForUserReducer  
});

export default AppReducer;
import { combineReducers } from 'redux';
import  cameraSettingsReducer   from './cameraSettingsReducer'
import  photosAndVideosReducer  from './photosAndVideosReducer'

const AppReducer = combineReducers({
  cameraSettingsReducer,
  photosAndVideosReducer  
});

export default AppReducer;
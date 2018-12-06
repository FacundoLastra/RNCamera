import { CHANGE_ZOMM, CHANGE_FLASH, CHANGE_AUTOFOCUS, CHANGE_TYPE, CHANGE_WHITE_BALANCE} from '../actions/CameraSettingsActions'
import { initialStateCameraSettings } from './initialState'
 
const cameraSettingsReducer = (state = initialStateCameraSettings, action) => {
    switch (action.type) {
        case CHANGE_ZOMM: {
            return {
                ...state,
                 zoom: action.payload
              }
        }           
        case CHANGE_FLASH: {
            return {
                ...state,
                flash: action.payload
            }
        }
        case CHANGE_AUTOFOCUS:{
            oldValue = state.autoFocus;
            return {
                ...state,
                autoFocus: !oldValue
            }
        }
        case CHANGE_TYPE: {
            return {
                ...state,
                type: action.payload
            }
        }
        case CHANGE_WHITE_BALANCE: {
            return {
                ...state,
                whiteBalance: action.payload
            }
        }                
        default:
            return state;
    }
};
export default timelineForUserReducer;
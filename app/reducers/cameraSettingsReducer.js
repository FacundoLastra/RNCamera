import { CHANGE_ZOMM, CHANGE_FLASH, CHANGE_AUTOFOCUS, CHANGE_TYPE, CHANGE_WHITE_BALANCE, CHANGE_RECORDING} from '../actions/cameraSettingsActions'
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
            let newValue = state.autoFocus === 'on' ? 'off' : 'on';
            return {
                ...state,
                autoFocus: newValue
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
        case CHANGE_RECORDING: {
            let oldValue = state.isRecording;
            return {
                ...state,
                isRecording: !oldValue
            }
        }                
        default:
            return state;
    }
};
export default cameraSettingsReducer;
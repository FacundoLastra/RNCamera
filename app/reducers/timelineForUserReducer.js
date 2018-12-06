
import { FETCH_TimelineForUser_BEGIN, FETCH_TimelineForUser_SUCCESS, FETCH_TimelineForUser_FAILURE} from '../actions/timelineForUserActions'
import { initialStateFech } from './initialState'
 
const cameraSettingsReducer = (state = initialStateFech, action) => {
    switch (action.type) {
        case FETCH_TimelineForUser_BEGIN:{
            return {
                ...state,
                 loading:true,
                 error: null 
              }
        }           
        case FETCH_TimelineForUser_SUCCESS:{
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload
            }
        }
        case FETCH_TimelineForUser_FAILURE:{
            return {
                ...state,
                loading: false,
                error: action.payload,
                data: [] 
            }
        }                
        default:
            return state;
    }
};
export default timelineForUserReducer;
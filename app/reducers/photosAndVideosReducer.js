import { SAVE_PICTURE, SAVE_VIDEO, START_RECORDING } from '../actions/cameraSettingsActions'
import { initialStatePhotosandVideos } from './initialState'
import { getLastValidId } from '../utils/arrayUtils'


const cameraSettingsReducer = (state = initialStatePhotosandVideos, action) => {
    switch (action.type) {
        case SAVE_PICTURE: {
            return {
                ...state,
                 photos: [...state.photos,
                            { 
                                photo: action.payload, 
                                id: getLastValidId(state.photos)
                            }
                         ]
              }
        }           
        case SAVE_VIDEO: {
            return {
                ...state,
                videos:[ ...state.videos,
                        {
                            video: action.payload,
                            id: getLastValidId(state.videos)
                        }
                       ] 
            }
        }                    
        default:
            return state;
    }
};
export default cameraSettingsReducer;
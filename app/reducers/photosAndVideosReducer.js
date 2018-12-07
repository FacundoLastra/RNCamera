import { SAVE_PICTURE, SAVE_VIDEO } from '../actions/cameraPicturesAndVideoActions'
import { initialStatePhotosandVideos } from './initialState'
import { getLastValidId } from '../utils/arrayUtils'


const photosAndVideosReducer = (state = initialStatePhotosandVideos, action) => {
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
        default: {
            return state;
        }
            
    }
};
export default photosAndVideosReducer;
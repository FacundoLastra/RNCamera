import { RNCamera } from 'react-native-camera';
 
 const initialStateCameraSettings = { 
    flash: 'auto',
    zoom: 0,
    autoFocus: 'on',
    type: 'back', ///if is the back camera or the front camera
    whiteBalance: 'auto',
    isRecording: false,
    recordOptions: {
        mute: false,
        maxDuration: 5,
        quality: RNCamera.Constants.VideoQuality["288p"],
        }
};

const initialStatePhotosandVideos = {
    photos: [],
    videos: []
}
const initialStateFaces = {
    faces: []
}

const initialStateBarScanned = {
    barScanned: []
}

 export { initialStateCameraSettings, initialStatePhotosandVideos, initialStateFaces, initialStateBarScanned };
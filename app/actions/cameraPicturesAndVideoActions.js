export const SAVE_PICTURE = 'SAVE_PICTURE'
export const SAVE_VIDEO = 'SAVE_VIDEO'
export const START_RECORDING = 'START_RECORDING'


export const savePicture = (picture) => ({
    type: SAVE_PICTURE,
    payload: picture
  });

export const saveVideo = (video) => ({
    type: SAVE_VIDEO,
    payload: video
})

export const startRecording = () => ({
    type: START_RECORDING
})
export const CHANGE_ZOMM = 'CHANGE_ZOOM'
export const CHANGE_FLASH = 'CHANGE_FLASH'
export const CHANGE_AUTOFOCUS = 'CHANGE_AUTOFOCUS'
export const CHANGE_TYPE = 'CHANGE_TYPE'
export const CHANGE_WHITE_BALANCE = 'CHANGE_WHITE_BALANCE'
export const CHANGE_RECORDING = 'CHANGE_RECORDING'

export const changeZoom = (newZoomValue) => ({
    type: CHANGE_ZOMM,
    payload: newZoomValue
  });

export const changeFlash = (newFlashValue) => ({
    type: CHANGE_FLASH,
    payload: newFlashValue
});

export const changeAutoFocus = () => ({
    type: CHANGE_AUTOFOCUS
  });

export const changeType = (cameraType) => ({
    type: CHANGE_TYPE,
    payload: cameraType
  });

export const changeWhiteBalance = (newWhiteBalance) => ({
    type: CHANGE_WHITE_BALANCE,
    payload: newWhiteBalance
  });

export const startRecording = () => ({
    type: CHANGE_RECORDING
})

export const endRecording = () => ({
  type: CHANGE_RECORDING
})


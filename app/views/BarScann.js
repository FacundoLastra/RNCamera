import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import { changeType, changeFlash, changeWhiteBalance, changeAutoFocus, changeZoom, startRecording, endRecording } from '../actions/cameraSettingsActions'
import { savePicture, saveVideo } from '../actions/cameraPicturesAndVideoActions'
import CameraBottons from '../components/CameraBottons'

const landmarkSize = 2;

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};
class BarScann extends React.Component {
  constructor(props){
    super(props)
      this.state = {
        focusedScreen: true,
        faces: []
      }
    this.toggleFacing = this.toggleFacing.bind(this)
    this.toggleFlash = this.toggleFlash.bind(this)
    this.toggleWB = this.toggleWB.bind(this)
    this.toggleFocus = this.toggleFocus.bind(this)
    this.zoomOut = this.zoomOut.bind(this)
    this.zoomIn = this.zoomIn.bind(this)
  }
  
  
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () =>
      this.setState({ focusedScreen: true })
    );
    navigation.addListener('willBlur', () =>
      this.setState({ focusedScreen: false })
    );
  }
  
///bottons actions
  toggleFacing() {
    let newValue = this.props.cameraSettings.type === 'back' ? 'front' : 'back'
    this.props.dispatch(changeType(newValue));
  }

  toggleFlash() {
     this.props.dispatch(changeFlash(flashModeOrder[this.props.cameraSettings.flash])) 
  }

  toggleWB() {
      this.props.dispatch(changeWhiteBalance(wbOrder[this.props.cameraSettings.whiteBalance]))
  }

  toggleFocus() {
       this.props.dispatch(changeAutoFocus())
  }

  zoomOut() {
      const newZoom = this.props.cameraSettings.zoom - 0.1 < 0 ? 0 : this.props.cameraSettings.zoom - 0.1;
      this.props.dispatch(changeZoom(newZoom))
  }

  zoomIn() {
    const newZoom = this.props.cameraSettings.zoom + 0.1 > 1 ? 1 : this.props.cameraSettings.zoom + 0.1;
    this.props.dispatch(changeZoom(newZoom))
  }


  

  renderCamera() { 
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        type={this.props.cameraSettings.type}
        flashMode={this.props.cameraSettings.flash}
        autoFocus={this.props.cameraSettings.autoFocus}
        zoom={this.props.cameraSettings.zoom}
        whiteBalance={this.props.cameraSettings.whiteBalance}
        ratio={this.props.cameraSettings.ratio}
        focusDepth={this.props.cameraSettings.depth}
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        onFacesDetected={this.onFacesDetected}
        onFaceDetectionError={this.onFaceDetectionError}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
      >    
        <CameraBottons
          onFlip = {this.toggleFacing}
          onFlash = {this.toggleFlash}
          onWhiteBalance = {this.toggleWB}
          onZoomOut = {this.zoomOut}
          onZoomIn = {this.zoomIn}
          onFocus = {this.toggleFocus}
          onTakePicture = {this.takePicture}
          onTakeVideo = {this.takeVideo}
          cameraSettings = {this.props.cameraSettings}  
          displayCaptureBottoms = {false}
        />
      </RNCamera>
    );
  }
  ///to solved the tabNavigator bug
  render() {
    const { hasCameraPermission, focusedScreen } = this.state;
    if (hasCameraPermission === null) {
        return <View />;
      } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      } else if (focusedScreen){
        return <View style={styles.container}>{this.renderCamera()}</View>;
      } else {
        return <View />;
      }
  }
}
function mapStateToProps(state, props) {
    return {
        cameraSettings: state.cameraSettingsReducer
    }
}
//Connect everything
export default connect(mapStateToProps)(BarScann);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000'
  }
  })

  

  
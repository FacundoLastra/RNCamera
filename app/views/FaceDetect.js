import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import { changeType, changeFlash, changeWhiteBalance, changeAutoFocus, changeZoom, startRecording, endRecording } from '../actions/cameraSettingsActions'
import { savePicture, saveVideo } from '../actions/cameraPicturesAndVideoActions'
import CameraBottons from '../components/CameraBottons'
import { flashModeOrder, wbOrder } from '../utils/cameraConst' 

const landmarkSize = 2;

class FaceDetect extends React.Component {
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

  ///face detection funtions

onFacesDetected = ({ faces }) =>{
    this.setState({ faces })
  };
onFaceDetectionError = state => console.warn('Faces detection error:', state);

renderFace({ bounds, faceID, rollAngle, yawAngle }) {
  return (
    <View
      key={faceID}
      transform={[
        { perspective: 600 },
        { rotateZ: `${rollAngle.toFixed(0)}deg` },
        { rotateY: `${yawAngle.toFixed(0)}deg` },
      ]}
      style={[
        styles.face,
        {
          ...bounds.size,
          left: bounds.origin.x,
          top: bounds.origin.y,
        },
      ]}
    >
      <Text style={styles.faceText}>ID: {faceID}</Text>
      <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
      <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
    </View>
  );
}

renderLandmarksOfFace(face) {
  const renderLandmark = position =>
    position && (
      <View
        style={[
          styles.landmark,
          {
            left: position.x - landmarkSize / 2,
            top: position.y - landmarkSize / 2,
          },
        ]}
      />
    );
  return (
    <View key={`landmarks-${face.faceID}`}>
      {renderLandmark(face.leftEyePosition)}
      {renderLandmark(face.rightEyePosition)}
      {renderLandmark(face.leftEarPosition)}
      {renderLandmark(face.rightEarPosition)}
      {renderLandmark(face.leftCheekPosition)}
      {renderLandmark(face.rightCheekPosition)}
      {renderLandmark(face.leftMouthPosition)}
      {renderLandmark(face.mouthPosition)}
      {renderLandmark(face.rightMouthPosition)}
      {renderLandmark(face.noseBasePosition)}
      {renderLandmark(face.bottomMouthPosition)}
    </View>
  );
}

renderFaces() {
  return (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderFace)}
    </View>
  );
}

renderLandmarks() {
  return (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderLandmarksOfFace)}
    </View>
  );
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
          cameraSettings = {this.props.cameraSettings}  
          displayCaptureBottoms = {false}
        />
        {this.renderFaces()}
        {this.renderLandmarks()}
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
export default connect(mapStateToProps)(FaceDetect);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000'
  },
    facesContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      top: 0,
    },
    face: {
      padding: 10,
      borderWidth: 2,
      borderRadius: 2,
      position: 'absolute',
      borderColor: '#FFD700',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    landmark: {
      width: landmarkSize,
      height: landmarkSize,
      position: 'absolute',
      backgroundColor: 'red',
    },
    faceText: {
      color: '#FFD700',
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 10,
      backgroundColor: 'transparent',
    },
  })

  

  

  


import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import { changeType, changeFlash, changeWhiteBalance, changeAutoFocus, changeZoom, startRecording, endRecording } from '../actions/cameraSettingsActions'
import { savePicture, saveVideo } from '../actions/cameraPicturesAndVideoActions'
import Icon from 'react-native-vector-icons/Foundation';
import FlipIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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

class PhotosAndVideos extends React.Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    photoId: 1,
    showGallery: false,
    photos: [],
    faces: [],
    recordOptions: {
      mute: false,
      maxDuration: 5,
      quality: RNCamera.Constants.VideoQuality["288p"],
    },
    isRecording: false
  };
  
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () =>
      this.setState({ focusedScreen: true })
    );
    navigation.addListener('willBlur', () =>
      this.setState({ focusedScreen: false })
    );
    console.log(this.props.cameraSettings);
  }

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

  takePicture = async function() {
    if (this.camera) {
      this.camera.takePictureAsync()
      .then( (data) => {
        this.props.dispatch(savePicture(data))
      });
    }
  };

  takeVideo = async function() {
    if (this.camera) {
      try {
        const promise = this.camera.recordAsync(this.props.cameraSettings.recordOptions);
        if (promise) {
          this.props.dispatch(startRecording());
          const data = await promise;
          this.props.dispatch(endRecording())
          this.props.dispatch(saveVideo(data))
        }
      } catch (e) {
        console.warn(e);
      }
    }
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
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
      >
        <View
          style={{
            flex: 0.5,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>
            <FlipIcon name="ios-reverse-camera" size={40} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
            <FlipIcon name="md-flash" size={26} color="#ffffff" />
            <Text style={styles.flipText}>{this.props.cameraSettings.flash} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flipButton} onPress={this.toggleWB.bind(this)}>
            <MaterialIcon name="white-balance-auto" size={26} color="#ffffff" />
            <Text style={styles.flipText}> {this.props.cameraSettings.whiteBalance} </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.3,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
        </View>
        <View
          style={{
            flex: 0.2,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end', justifyContent: 'flex-start' }]}
            onPress={this.zoomIn.bind(this)}
          >
            <MaterialIcon name="plus" size={32} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomOut.bind(this)}
          >
            <MaterialIcon name="minus" size={32} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
            onPress={this.toggleFocus.bind(this)}
          >
          <MaterialIcon name="image-filter-center-focus" size={25} color="#ffffff" />          
            <Text style={styles.flipText}> {this.props.cameraSettings.autoFocus} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, styles.recButtom]}
            onPress={this.props.cameraSettings.isRecording ? () => {} : this.takeVideo.bind(this)}
          >
            {
              this.props.cameraSettings.isRecording ?
              <Text style={styles.flipText}> Stop </Text>
              :
              <Icon name="record" size={30} color="#ffffff" />
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, styles.picButton]}
            onPress={this.takePicture.bind(this)}
          >          
            <FlipIcon name="ios-aperture" size={26} color="#ffffff" />
          </TouchableOpacity>
        </View>
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
export default connect(mapStateToProps)(PhotosAndVideos);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  navigation: {
    flex: 1,
  },
  flipButton: {
    flex: 0.2,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  item: {
    margin: 4,
    backgroundColor: 'indianred',
    height: 35,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picButton: {
    backgroundColor: 'darkseagreen',
    borderRadius: 30,
    alignSelf: 'flex-end',
    marginRight: 5
  },
  recButtom: {
    backgroundColor: '#e81212',
    borderRadius: 30,
    alignSelf: 'flex-end'
  },
  row: {
    flexDirection: 'row',
  },
});
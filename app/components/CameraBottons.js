import React,{Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Slider } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import FlipIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class CameraBottons extends React.Component {
    constructor(props){
        super(props)
        this.handleFlip = this.handleFlip.bind(this);
        this.handleFlash = this.handleFlash.bind(this);
        this.handleWB = this.handleWB.bind(this);
        this.handleZoomOut = this.handleZoomOut.bind(this);
        this.handleZoomIn = this.handleZoomIn.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleTakePicture = this.handleTakePicture.bind(this);
        this.handleTakeVideo = this.handleTakeVideo.bind(this);
    }
    handleFlip() {
        this.props.onFlip()
    }
    handleFlash() {
        this.props.onFlash()
    }
    handleWB() {
        this.props.onWhiteBalance()
    }
    handleZoomOut() {
        this.props.onZoomOut()
    }
    handleZoomIn() {
        this.props.onZoomIn()
    }
    handleFocus() {
        this.props.onFocus()
    }
    handleTakePicture() {
        this.props.onTakePicture()
    }
    handleTakeVideo() {
        this.props.onTakeVideo()
    }
    render() {
        let photoBotton = <View />
        let videoBotton = <View />
        if( this.props.displayCaptureBottoms ) {
            photoBotton = <TouchableOpacity
                            style={[styles.flipButton, styles.recButtom]}
                            onPress={this.props.cameraSettings.isRecording ? () => {} : this.handleTakeVideo}
                          >
                                {
                                this.props.cameraSettings.isRecording ?
                                <Text style={styles.flipText}> Stop </Text>
                                :
                                <Icon name="record" size={30} color="#ffffff" />
                                }
                            </TouchableOpacity>

            videoBotton =  <TouchableOpacity
                                style={[styles.flipButton, styles.picButton]}
                                onPress={this.handleTakePicture}
                            >          
                                <FlipIcon name="ios-aperture" size={26} color="#ffffff" />
                            </TouchableOpacity>
                            
                                
                                
                            
        }
        return(
            <View style={styles.container}>
                <View
                style={{
                    flex: 0.5,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
                >
                    <TouchableOpacity style={styles.flipButton} onPress={this.handleFlip}>
                        <FlipIcon name="ios-reverse-camera" size={40} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flipButton} onPress={this.handleFlash}>
                        <FlipIcon name="md-flash" size={26} color="#ffffff" />
                        <Text style={styles.flipText}>{this.props.cameraSettings.flash} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flipButton} onPress={this.handleWB}>
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
                        onPress={this.handleZoomIn}
                    >
                        <MaterialIcon name="plus" size={32} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
                        onPress={this.handleZoomOut}
                    >
                        <MaterialIcon name="minus" size={32} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
                        onPress={this.handleFocus}
                    >
                    <MaterialIcon name="image-filter-center-focus" size={25} color="#ffffff" />          
                        <Text style={styles.flipText}> {this.props.cameraSettings.autoFocus} </Text>
                    </TouchableOpacity>
                    
                    {photoBotton}
                    {videoBotton}
                    
                </View>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      backgroundColor: 'transparent'
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
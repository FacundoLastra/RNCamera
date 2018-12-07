import React, { PureComponent } from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';

import Video from 'react-native-video';

export default class MyListVideo extends PureComponent {
    constructor(props){
      super(props)
    }  
    
    render() {
      return (
          <View style={styles.container}>
          
            <Video source={{uri: this.props.video.uri}}  
                ref={(ref) => {
                    this.player = ref
                }}
                paused={false}                             
                onBuffer={this.onBuffer}                
                onError={this.videoError}               
                style={styles.backgroundVideo}
             />

          </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,    
      marginTop: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 10,
        left: 10,
        bottom: 10,
        right: 10
      }
  
  })

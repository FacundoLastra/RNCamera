import React, { PureComponent } from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class MyListPhoto extends PureComponent {
    constructor(props){
      super(props)
    }  
    //style={{width: this.props.photo.width, height: this.props.photo.height}}
    render() {
      return (
          <View style={styles.container}>
            <Image
              style={styles.photoDimension}
              source={{uri: this.props.photo.uri}}
              resizeMode = 'cover'
            />
          </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,    
      marginTop: 5
    },
    photoDimension: {
      width: width,
      height: height
    }
  
  })

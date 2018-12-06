import React, { PureComponent } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class MyListPhoto extends PureComponent {
    constructor(props){
      super(props)
    }  
    //style={{width: this.props.photo.width, height: this.props.photo.height}}
    render() {
      return (
          <View style={{flex:1}}>
            <Image
              style={{width:500, height: 500}}
              source={{uri: this.props.photo.uri}}
              resizeMode = 'cover'
            />
          </View>
      );
    }
  }

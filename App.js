import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CameraTest  from './app/components/CameraTest'
import CameraTest2 from './app/components/CameraTest2'

export default class App extends Component {
  constructor(props){
    super(props)
  }  
  render() {
    return (
      <View style={styles.container}>
        <CameraTest2 />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import CameraTest  from './components/CameraTest'
import CameraTest2 from './components/CameraTest2'

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

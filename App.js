import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CameraTest  from './app/components/CameraTest'
import CameraTest2 from './app/components/CameraTest2'
///redux imports
import { Provider } from 'react-redux';
import AppReducer from './app/reducers/index';
import { createStore } from 'redux';
import  TabNavigator  from './app/navigation/AppNavigator'

const store = createStore(AppReducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <TabNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

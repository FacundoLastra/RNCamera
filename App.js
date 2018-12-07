import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
///redux imports
import { Provider } from 'react-redux';
import AppReducer from './app/reducers/index';
import { createStore } from 'redux';
import TabNavigator from './app/navigation/AppNavigator'

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

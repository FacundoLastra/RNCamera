import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
//import Icon from 'react-native-vector-icons/EvilIcons'

import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = (<Icon name="rocket" size={30} color="#900" />)


export default class Gallery extends React.Component {
    render() {
        return (
            <View>
                <Text>Hola soy la Galeria, por ahora</Text>
                <Icon name="rocket" size={30} color="#900" />
            </View>
        )
    }
}
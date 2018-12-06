import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import { connect } from 'react-redux';
import MyListPhoto from '../components/MyListPhoto'
//import Icon from 'react-native-vector-icons/EvilIcons'

import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = (<Icon name="rocket" size={30} color="#900" />)


 class Gallery extends React.Component {
    constructor(props){
        super(props)
        this.renderItem = this.renderItem.bind(this);
    } 

    renderItem(item) {
        return (
            <MyListPhoto
                photo= {item.item.photo}
            />
        )

    }
    render() {
        return (
            <View>
               <FlatList
                    data={this.props.photos}
                    keyExtractor={ (item) => item.id.toString()}
                    renderItem={this.renderItem}
      />
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        photos: state.photosAndVideosReducer.photos,
        videos: state.photosAndVideosReducer.videos
    }
}
//Connect everything
export default connect(mapStateToProps)(Gallery);

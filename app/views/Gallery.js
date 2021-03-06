import React, {Component} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, Text} from 'react-native';
import { connect } from 'react-redux';
import MyListPhoto from '../components/MyListPhoto'
import MyListVideo from '../components/MyListVideo'

//import Icon from 'react-native-vector-icons/EvilIcons'
import Icon from 'react-native-vector-icons/FontAwesome';



 class Gallery extends React.Component {
    constructor(props){
        super(props)
        this.renderItemImages = this.renderItemImages.bind(this);
        this.renderItemVideos = this.renderItemVideos.bind(this);
        this.state = {
            viewSelected: 'images'
        }
    } 

    renderItemImages(item) {
        return (
            <MyListPhoto
                photo= {item.item.photo}
            />
        )
    }

    renderItemVideos(item) {
        return(
            <MyListVideo
                video = {item.item.video}
            />
        )
    }
    render() {
        let listView = <View/>
        if(this.state.viewSelected === 'images'){
            let photosArray = this.props.photos;
            listView = <FlatList
                        data={photosArray.reverse()}
                        keyExtractor={ (item) => item.id.toString()}
                        renderItem={this.renderItemImages}
                     />
        }else{
            if(this.props.videos.length > 0 ){
                listView = <MyListVideo    ///bug using flatList and ScrolView
                                video = {this.props.videos[0].video}
                            />
            }else{
                listView = <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                                <Text>Sorry you don't have videos</Text>
                           </View>
            }   
        }
        return (
            <View style={styles.container}>
                <View style={styles.bottonsContainer}>
                    <TouchableOpacity
                        style={[styles.flipButton]}
                        onPress={() => this.setState({viewSelected: "images"})}
                    >
                        <Icon name="image" size={40} color="#900" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.flipButton]}
                        onPress={() => this.setState({viewSelected: "videos"})}
                    >
                        <Icon name="file-video-o" size={40} color="#900" />
                    </TouchableOpacity>
                </View>
                <View style={styles.listContainer}>
                     {listView}        
                </View>               
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

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    bottonsContainer: {
        flex: 0.1,
        marginBottom: 3,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listContainer: {
        flex: 0.9
    },
    flipButton: {
        flex: 0.2,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        padding: 5
    }
})
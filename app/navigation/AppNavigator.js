import React from 'react';
import { Platform } from 'react-native'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import PhotosAndVideos from '../views/PhotosAndVideos'
import FaceDetect from '../views/FaceDetect'
import BarScann from '../views/BarScann'
import Gallery from '../views/Gallery'
import Icon from 'react-native-vector-icons/Entypo'
import SecondIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import ThirdIcon from 'react-native-vector-icons/AntDesign'
import FourIcon from 'react-native-vector-icons/Entypo'

const TabNavigator = createBottomTabNavigator({
    PhotosAndVideos:{ 
          screen: PhotosAndVideos,
          navigationOptions: {
              tabBarIcon: ({ tintColor }) => (
                  <Icon name="camera" color={tintColor} size={28} />
              )
    }},
    FaceDetect:{ 
      screen: FaceDetect,
      navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <SecondIcon name="face" color={tintColor} size={32}/>
      )
          
    }},
    BarScann: {
      screen: BarScann,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <ThirdIcon name="barcode" color={tintColor} size={24}/>
        )
            
      }
    },
    Gallery: {
        screen: Gallery,
        navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <FourIcon name="images" color={tintColor} size={24}/>
        )}
    }   
  },{ tabBarOptions: { showIcon: true, showLabel: true }})


  export default createAppContainer(TabNavigator);
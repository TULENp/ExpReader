import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'
import { srcIcnPoints, srcImgProfileHeader } from '../constants/images'
import { stylesProfileScreen } from './stylesScreen'
import { Avatar } from 'react-native-elements'

export default function ProfileScreen() {
    return (
        <>
          <ImageBackground style={stylesProfileScreen.img_header} source={srcImgProfileHeader}>
              <Avatar  titleStyle={{fontSize:32}} size={'large'} containerStyle={stylesProfileScreen.avatar} rounded title='И'/>
              <View style={stylesProfileScreen.container_avatar_points}>
                <Text style={stylesProfileScreen.text_name}>Иван Иванов</Text>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Image style={stylesProfileScreen.icn_points} source={srcIcnPoints}/>
                  <Text style={stylesProfileScreen.text_points}>854</Text>
                </View>
              </View>
          </ImageBackground>
        </>
    )
}
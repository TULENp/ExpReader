import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'
import { srcIcnPoints, srcIcnSetting, srcImgProfileHeader } from '../constants/images'
import { stylesProfileScreen } from './stylesScreen'
import { Avatar } from 'react-native-elements'
import { LinearProgress } from '@rneui/themed'
import { greenRarity, white } from '../constants/colors'

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
          <View style={stylesProfileScreen.container_level}>
            <View style={stylesProfileScreen.wrapper_text_level_settings}>
              <Text style={stylesProfileScreen.text_level_bold}>Уровень:
                <Text style={[stylesProfileScreen.text_level_medium, {color:greenRarity}]}> лёгкий</Text>
              </Text>
              <Image style={stylesProfileScreen.icn_settings} source={srcIcnSetting}/>
            </View>
            <LinearProgress value={0.56} color={greenRarity} style={stylesProfileScreen.progress_bar} trackColor={white} variant='determinate'/>
            <Text style={stylesProfileScreen.text_level_light}>Прочитано сегодня 42/50</Text>
          </View>
          
        </>
    )
}
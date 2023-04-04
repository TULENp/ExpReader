import { View, Text, ImageBackground, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { srcIcnPoints, srcIcnSetting, srcImgProfileHeader } from '../constants/images'
import { stylesProfileScreen } from './stylesScreen'
import { Avatar } from 'react-native-elements'
import { LinearProgress } from '@rneui/themed'
import { greenRarity, white } from '../constants/colors'
import { ProfileStackParams, TDailyTask, TPin, TUserData } from '../types'
import { pins } from '../TestData/pins'
import { BookProfileCard } from '../components/BookProfileCard'
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import { getDailyTaskLevel } from '../service/motivation'
import { getDailyTaskAS, getTodayPagesAS, getUserDataAS } from '../service/asyncStorage'

export default function ProfileScreen() {

      const [userData, setUserData] = useState<TUserData | null>(null);
    const [todayPages, setTodayPages] = useState<number>(0);
    const [dailyTaskPages, setDailyTaskPages] = useState<TDailyTask>(60);
    const [dailyTaskLevel, setDailyTaskLevel] = useState<string>('');
    const { navigate } = useNavigation<NavigationProp<ProfileStackParams>>();

    useFocusEffect(
        React.useCallback(() => {
            getUserData();
            getTodayPages();
            getDailyTask();
            setDailyTaskLevel(getDailyTaskLevel(dailyTaskPages));
        }, [])
    );

    async function getUserData() {
        const data = await getUserDataAS();
        setUserData(data);
    }

    async function getTodayPages() {
        const todayPages = await getTodayPagesAS();
        setTodayPages(todayPages);
    }

    async function getDailyTask() {
        const dailyTask = await getDailyTaskAS();
        setDailyTaskPages(dailyTask);
    }
    
    //return first five pins
    const firstFivePins:JSX.Element[] = pins.slice(0, 5).map(item => {
        return <Image style={stylesProfileScreen.img_pin} source={item.img}/>;
    });

    return (
        <>
        <ScrollView >
          <View style={stylesProfileScreen.profile_page}>


          <ImageBackground style={stylesProfileScreen.img_header} source={srcImgProfileHeader}>
              <Avatar  titleStyle={{fontSize:32, fontFamily:'Montserrat700'}} size={'large'} containerStyle={stylesProfileScreen.avatar} rounded title='И'/>
              <View style={stylesProfileScreen.container_avatar_points}>
                <Text style={stylesProfileScreen.text_name}>Иван Иванов</Text>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Image style={stylesProfileScreen.icn_points} source={srcIcnPoints}/>
                  <Text style={stylesProfileScreen.text_points}>854</Text>
                </View>
              </View>
          </ImageBackground>

      {/* add <DailyTaskProgress dailyTaskPages={dailyTaskPages} todayPages={todayPages} level={dailyTaskLevel} /> */}
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

          <View style={stylesProfileScreen.container_achievements}>
            <Text style={stylesProfileScreen.h1_profile_bold}>Достижения:
              <Text style={stylesProfileScreen.h1_profile_medium}> 5</Text>
            </Text>
            <View style={stylesProfileScreen.wrapper_pins}>
                {firstFivePins}
            </View>
          </View>

          <View style={stylesProfileScreen.container_bookshelf}>
            <Text style={stylesProfileScreen.h1_profile_bold}>Полка:
                <Text style={stylesProfileScreen.h1_profile_medium}> 5</Text>
            </Text>
            <View style={stylesProfileScreen.container_profile_books}>
              <BookProfileCard/>
              <BookProfileCard/>
              <BookProfileCard/>
              <BookProfileCard/>
              <BookProfileCard/>

            </View>
          </View>

          </View>
        </ScrollView>
        </>
  )
}
import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons'; 
import { stylesCheckoutScreen } from './stylesScreen';
import { deepBlue } from '../constants/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ShopStackParams } from '../types';
import { srcIcnSberbank } from '../constants/images';

export default function CheckoutScreen() {

    const { goBack } = useNavigation<NavigationProp<ShopStackParams>>();

    return (
        <>
          <View style={stylesCheckoutScreen.checkout_page}>
            <ScrollView>
              <StatusBar backgroundColor = {deepBlue}/>
              {/* icon back and header text */}
              <View style={stylesCheckoutScreen.container_header}>
                <TouchableOpacity 
                                  onPress={()=> goBack()}
                                  >
                    <MaterialIcons name="keyboard-backspace" 
                                   size={36} 
                                   color="black" 
                                   />
                </TouchableOpacity>
                <Text style={stylesCheckoutScreen.text_header}>Избранное</Text>
              </View>
              {/* Payment method */}
              <View style={{marginLeft:13, marginTop:30}}>
                <Text style={stylesCheckoutScreen.text_header_light}>Способ оплаты</Text>
                <View style={{flexDirection:'row', marginTop:20, alignItems:'center'}}>
                  <Image style={stylesCheckoutScreen.icn_sber} source={srcIcnSberbank} />
                  <View style={{marginLeft:13}}>
                    <Text style={stylesCheckoutScreen.text_sber_online}>Сбербанк онлайн</Text>
                    <Text style={stylesCheckoutScreen.text_without_commission}>Без комиссии</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </>
    )
}
import { ButtonGroup } from '@rneui/themed';
import { useState } from 'react';
import { View, Text, KeyboardAvoidingView, FlatList, ImageBackground, StatusBar, Image, TouchableOpacity, ImageSourcePropType, Dimensions, ScrollView } from 'react-native'
import { greenRarity, purple, white } from '../../constants/colors';
import { stylesFilters } from './style';


export function Filters() {

    const listButtons = ['Фантастика', 'Приключения', 'Фэнтези', 'Киберпанк', 
    'Романы', 'Поэзия', 'Хоррор', 'Нон-Фикшн', 'Комедия', 'Исторические романы', 
    'Детективы'] 
    const [selectedGenre,setSelectedGenre] = useState<number>();

    return(
      <>
      <View style={{flex:1, paddingLeft:13, paddingRight:13}}>
        <Text>Фильтры</Text>
        <View style={{maxWidth:400, width:'100%'}}>
          <Text>Жанры</Text>
          <ButtonGroup buttons={listButtons}
            
            
            selectedIndex={selectedGenre}
            onPress={(value) => {
            setSelectedGenre(value);
            }}
            containerStyle={stylesFilters.container_style}
            textStyle={stylesFilters.text_style}
            buttonContainerStyle={stylesFilters.button_container_style}
            selectedButtonStyle={{ backgroundColor:greenRarity, borderRadius:8 }}
            selectedTextStyle={{}}
            buttonStyle={{padding:6, borderRadius:8}}
            />
        </View>
      </View>
      </>
    )
}


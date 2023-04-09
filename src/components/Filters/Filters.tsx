import { Button, ButtonGroup } from '@rneui/themed';
import { useState } from 'react';
import { View, Text, KeyboardAvoidingView, FlatList, ImageBackground, StatusBar, Image, TouchableOpacity, ImageSourcePropType, Dimensions, ScrollView } from 'react-native'
import { greenRarity, white, } from '../../constants/colors';
import { stylesFilters } from './style';
import { srcIcnStarBlueRarirty, srcIcnStarGreenRarirty, srcIcnStarRedRarirty, srcIcnStarYellowRarirty } from '../../constants/images';
import { CustomIcon } from '../CustomIcon';
import { Dropdown } from 'react-native-element-dropdown';


export function Filters() {

    const listButtonsGenres = ['Фантастика', 'Приключения', 'Фэнтези', 'Киберпанк', 
    'Романы', 'Поэзия', 'Хоррор', 'Нон-Фикшн', 'Комедия', 'Исторические романы', 
    'Детективы'] 
    const [selectedGenre,setSelectedGenre] = useState<number>();
    const [selectedRarity,setSelectedRarity] = useState<number>();
    const [selectedSort,setSelectedSort] = useState<string>();


    const listButtonsRarity= [<CustomIcon source={srcIcnStarGreenRarirty}/>,
    <CustomIcon source={srcIcnStarBlueRarirty}/>,
    <CustomIcon source={srcIcnStarRedRarirty}/>,
    <CustomIcon source={srcIcnStarYellowRarirty}/>,];

    const listSort = [
      {label:'Новинки', value:'1'},
      {label:'Популряное', value:'2'},
      {label:'Сначала дешёвые', value:'3'},
      {label:'Сначала дорогие', value:'4'},
    ]

    return(
      <>
      <View style={{flex:1, paddingLeft:13, paddingRight:13, paddingTop:20}}>
        <Text style={stylesFilters.h1}>Фильтры</Text>

        {/* Button Group genres */}
        <View style={stylesFilters.wrapper_genres}>
          <Text style={stylesFilters.h2}>Жанры</Text>
          <ButtonGroup buttons={listButtonsGenres}
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

        {/* Button Group rarity */}
        <View style={{borderBottomWidth:3, borderBottomColor:'#CACACA'}}>
            <Text style={[stylesFilters.h2, {marginTop:10}]}>Редкость</Text>
            <ButtonGroup buttons={listButtonsRarity}
              selectedIndex={selectedRarity}
              onPress={(value) => {
                setSelectedRarity(value);
                }}
                containerStyle={[stylesFilters.container_style, {height:70}]}
                buttonContainerStyle={stylesFilters.button_container_rarity}
                selectedButtonStyle={{ backgroundColor:greenRarity, borderRadius:8 }}
                selectedTextStyle={{}}
                buttonStyle={{padding:0, width:50, borderWidth:2, borderRadius:8}}
              />
        </View>

        {/* Select */}
        <View style={{marginTop:10}}>
          <Text style={stylesFilters.h2}>Сортировка</Text>
          <Dropdown data={listSort}
            mode='modal'
            maxHeight={300}
            style={stylesFilters.select}
            fontFamily='MontserratAlt700'
            placeholderStyle={{color:'white'}}
            selectedTextStyle={{color:'white'}}
            activeColor={greenRarity}
            itemContainerStyle={{borderRadius:8}}
            containerStyle={{borderRadius:8}}
            iconColor='white'
            placeholder='Выбрать' 
            labelField={'label'} 
            valueField={'value'} 
            value={selectedSort}
            onChange= {(item)=> setSelectedSort(item.value)}/>
        </View>
      </View>
      </>
    )
}


import { ButtonGroup } from '@rneui/themed';
import { View, Text, Button } from 'react-native'
import { greenRarity, } from '../../constants/colors';
import { stylesFilters } from './style';
import { srcIcnStarBlueRarity, srcIcnStarGreenRarity, srcIcnStarRedRarity, srcIcnStarYellowRarity } from '../../constants/images';
import { CustomIcon } from '../CustomIcon';
import { Dropdown } from 'react-native-element-dropdown';
import { TFilters } from '../../screens/ShopScreen';

type FiltersProps = {
	filters: TFilters,
	setFilters: (filters: TFilters) => void,
	filterBooks: (isReset: boolean) => Promise<void>
}

export function Filters({ filters, setFilters, filterBooks }: FiltersProps) {

	const listButtonsGenres = ['Фантастика', 'Приключения', 'Фэнтези', 'Классика',
		'Роман', 'Поэзия', 'Хоррор', 'Нон-Фикшн', 'Комедия', 'Исторический роман',
		'Детектив', 'Детские книги']

	const listButtonsRarity = [
		<CustomIcon source={srcIcnStarGreenRarity} />,
		<CustomIcon source={srcIcnStarBlueRarity} />,
		<CustomIcon source={srcIcnStarRedRarity} />,
		<CustomIcon source={srcIcnStarYellowRarity} />,
	];

	const listSort = [
		{ label: 'Популярное', value: '0' },
		{ label: 'Сначала дешёвые', value: '1' },
		{ label: 'Сначала дорогие', value: '2' },
	]

	return (
		<>
			<View style={{ flex: 1, paddingLeft: 13, paddingRight: 13, paddingTop: 20 }}>
				<Text style={stylesFilters.h1}>Фильтры</Text>

				{/* Button Group genres */}
				<View style={stylesFilters.wrapper_genres}>
					<Text style={stylesFilters.h2}>Жанры</Text>
					<ButtonGroup buttons={listButtonsGenres}
						selectedIndexes={filters.genres}
						onPress={(value) => {
							//FIXME fix ts errors in every setFilters
							//@ts-ignore
							setFilters((prev) => {
								return {
									...prev,
									genres: value
								}
							});
						}}
						selectMultiple={true}
						containerStyle={stylesFilters.container_style}
						textStyle={stylesFilters.text_style}
						buttonContainerStyle={stylesFilters.button_container_style}
						selectedButtonStyle={{ backgroundColor: greenRarity, borderRadius: 8 }}
						selectedTextStyle={{}}
						buttonStyle={{ padding: 6, borderRadius: 8 }}
					/>
				</View>

				{/* Button Group rarity */}
				<View style={{ borderBottomWidth: 3, borderBottomColor: '#CACACA' }}>
					<Text style={[stylesFilters.h2, { marginTop: 10 }]}>Редкость</Text>
					<ButtonGroup buttons={listButtonsRarity}
						selectedIndex={filters.rarity}
						onPress={(value) => {
							//@ts-ignore
							setFilters((prev) => {
								return {
									...prev,
									rarity: value
								}
							});
						}}
						containerStyle={[stylesFilters.container_style, { height: 70 }]}
						buttonContainerStyle={stylesFilters.button_container_rarity}
						selectedButtonStyle={{ backgroundColor: greenRarity, borderRadius: 8 }}
						selectedTextStyle={{}}
						buttonStyle={{ padding: 0, width: 50, borderWidth: 2, borderRadius: 8 }}
					/>
				</View>

				{/* Select */}
				<View style={{ marginTop: 10 }}>
					<Text style={stylesFilters.h2}>Сортировка</Text>
					<Dropdown data={listSort}
						mode='modal'
						maxHeight={300}
						style={stylesFilters.select}
						fontFamily='MontserratAlt700'
						placeholderStyle={{ color: 'white' }}
						selectedTextStyle={{ color: 'white' }}
						activeColor={greenRarity}
						itemContainerStyle={{ borderRadius: 8 }}
						containerStyle={{ borderRadius: 8 }}
						iconColor='white'
						placeholder='Выбрать'
						labelField={'label'}
						valueField={'value'}
						value={filters.sortID}
						//@ts-ignore
						onChange={(item) => setFilters((prev) => {
							return {
								...prev,
								sortID: item.value
							}
						})} />
				</View>
			</View>
			<Button title='Применить' onPress={() => filterBooks(false)} />
			<Button title='Сбросить' onPress={() => filterBooks(true)} />
		</>
	)
}


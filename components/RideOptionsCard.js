import {
	FlatList,
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import React, { useState } from 'react'
import tailwind from 'twrnc'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

const data = [
	{
		id: 'UberX-123',
		title: 'UberX',
		multiplier: 1,
		image: 'https://links.papareact.com/3pn',
	},
	{
		id: 'UberXL-456',
		title: 'Uber XL',
		multiplier: 1.2,
		image: 'https://links.papareact.com/5w8',
	},
	{
		id: 'Uber-LUX-789',
		title: 'Uber LUX',
		multiplier: 1.75,
		image: 'https://links.papareact.com/7pf',
	},
]

const SURGE_CHARGE_RATE = 1.5

const RideOptionsCard = () => {
	const navigation = useNavigation()
	const [selected, setSelected] = useState(null)
	const travelTimeInformation = useSelector(selectTravelTimeInformation)

	return (
		<SafeAreaView style={tailwind`flex-1 bg-white relative flex-grow`}>
			<View>
				<TouchableOpacity
					style={tailwind`absolute top-3 left-5 z-50 p-3 rounded-full`}
					onPress={() => navigation.navigate('NavigateCard')}
				>
					<Icon name="chevron-left" type="fontawesome" />
				</TouchableOpacity>
				<Text style={tailwind`text-center py-5 text-xl`}>
					Select a ride - {travelTimeInformation?.distance?.text}
				</Text>
			</View>
			<FlatList
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({ item: { id, title, multiplier, image }, item }) => (
					<TouchableOpacity
						onPress={() => setSelected(item)}
						style={tailwind`flex flex-row items-center justify-between px-7 ${
							selected?.id === id && 'bg-gray-200'
						}`}
					>
						<Image
							source={{ uri: image }}
							style={{ width: 100, height: 100, resizeMode: 'contain' }}
						/>
						<View style={tailwind`-ml-6`}>
							<Text style={tailwind`text-xl font-semibold`}>{title}</Text>
							<Text>{travelTimeInformation?.duration?.text}</Text>
						</View>
						<Text style={tailwind`text-xl`}>
							{new Intl.NumberFormat('en-gb', {
								style: 'currency',
								currency: 'GBP',
							}).format(
								(SURGE_CHARGE_RATE *
									travelTimeInformation?.duration?.value *
									multiplier) /
									100
							)}
						</Text>
					</TouchableOpacity>
				)}
			/>
			<View style={tailwind`mt-auto border-t border-gray-200`}>
				<TouchableOpacity
					disabled={selected === null}
					style={tailwind`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}
				>
					<Text style={tailwind`text-center text-xl text-white`}>
						Choose {selected?.title}
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

export default RideOptionsCard

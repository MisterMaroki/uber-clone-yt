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

const RideOptionsCard = () => {
	const navigation = useNavigation()
	const [selected, setSelected] = useState(null)

	return (
		<SafeAreaView style={tailwind`bg-white flex-grow relative`}>
			<View>
				<TouchableOpacity
					style={tailwind`absolute top-3 left-5 z-50 p-3 rounded-full`}
					onPress={() => navigation.navigate('NavigateCard')}
				>
					<Icon name="chevron-left" type="fontawesome" />
				</TouchableOpacity>
				<Text style={tailwind`text-center py-5 text-xl`}>Select a ride</Text>
			</View>
			<FlatList
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({ item: { id, title, multiplier, image }, item }) => (
					<TouchableOpacity
						onPress={() => setSelected(item)}
						style={tailwind`flex flex-row items-center justify-between px-10 ${
							selected?.id === id && 'bg-gray-200'
						}`}
					>
						<Image
							source={{ uri: image }}
							style={{ width: 100, height: 100, resizeMode: 'contain' }}
						/>
						<View style={tailwind`-ml-6`}>
							<Text style={tailwind`text-xl font-semibold`}>{title}</Text>
							<Text>Travel Time:...</Text>
						</View>
						<Text style={tailwind`text-xl`}>£99.00</Text>
					</TouchableOpacity>
				)}
			/>
			<View>
				<TouchableOpacity
					disabled={!selected}
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

const styles = StyleSheet.create({})

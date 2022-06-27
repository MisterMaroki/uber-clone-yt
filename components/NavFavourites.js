import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import tailwind from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setOrigin } from '../slices/navSlice'

const data = [
	{
		id: '123',
		icon: 'home',
		location: 'Home',
		destination: '45 Seaview Avenue, Peacehaven, UK',
		coords: { lat: 50.7895708, lng: 0.0150896 },
	},
	{
		id: '456',
		icon: 'briefcase',
		location: 'Work',
		destination: '10 Elms lea Avenue, Brighton, UK',
		coords: { lat: 50.848009, lng: -0.1549256 },
	},
]
const NavFavourites = () => {
	const navigation = useNavigation()
	// const destination = useSelector(selectDestination)
	const dispatch = useDispatch()
	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.id}
			ItemSeparatorComponent={() => (
				<View style={[tailwind`bg-gray-200`, { height: 0.5 }]} />
			)}
			renderItem={({ item: { icon, location, destination, coords } }) => (
				<TouchableOpacity
					style={tailwind`flex-row items-center p-5`}
					onPress={() => {
						dispatch(
							setOrigin({
								location: coords,
								description: destination,
							})
						)

						navigation.navigate('MapScreen')
					}}
				>
					<Icon
						style={tailwind`mr-4 rounded-full bg-gray-300 p-3`}
						name={icon}
						type="ionicon"
						color="white"
						size={18}
					/>
					<View>
						<Text style={tailwind`font-semibold text-lg`}>{location}</Text>
						<Text style={tailwind`text-gray-500`}>{destination}</Text>
					</View>
				</TouchableOpacity>
			)}
		/>
	)
}

export default NavFavourites

const styles = StyleSheet.create({})

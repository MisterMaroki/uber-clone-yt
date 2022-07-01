import {
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import React, { useEffect, useMemo, useRef } from 'react'
import tailwind from 'twrnc'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { setDestination } from '../slices/navSlice'
import NavFavourites from './NavFavourites'
import { Icon } from 'react-native-elements'
const NavigateCard = () => {
	const dispatch = useDispatch()
	const navigation = useNavigation()

	return (
		<SafeAreaView style={tailwind`flex-1 bg-white`}>
			<Text style={tailwind`text-center py-5 text-xl`}>Good Morning, Omar</Text>
			<View style={tailwind`border-t border-gray-200 flex-shrink`}>
				<GooglePlacesAutocomplete
					nearbyPlacesAPI="GooglePlacesSearch"
					fetchDetails={true}
					styles={toInputBoxStyles}
					enablePoweredByContainer={false}
					minLength={2}
					returnKeyType="search"
					onPress={(data, details = null) => {
						dispatch(
							setDestination({
								location: details.geometry.location,
								description: data.description,
							})
						)

						navigation.navigate('RideOptionsCard')
					}}
					placeholder="Where to?"
					query={{
						key: GOOGLE_MAPS_APIKEY,
						language: 'en',
					}}
				/>
				<NavFavourites />
			</View>
			<View
				style={tailwind`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
			>
				<TouchableOpacity
					onPress={() => navigation.navigate('RideOptionsCard')}
					style={tailwind`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
				>
					<Icon name="car" type="font-awesome" color="#fff" size={16} />
					<Text style={tailwind`text-white text-center`}>Rides</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={tailwind`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}
				>
					<Icon
						name="fast-food-outline"
						type="ionicon"
						color="#000"
						size={16}
					/>
					<Text style={tailwind`text-center`}>Eats</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		paddingTop: 20,
		flex: 0,
	},
	textInput: {
		fontSize: 18,
		backgroundColor: '#DDDDDF',
		borderRadius: 0,
	},
	textInputContainer: {
		paddingHorizontal: 20,
		paddingBottom: 0,
	},
})

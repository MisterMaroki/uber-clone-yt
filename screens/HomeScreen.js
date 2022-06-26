import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'

const HomeScreen = () => {
	return (
		<SafeAreaView style={tw`bg-white h-full`}>
			<View style={tw`p-5 justify-start w-full`}>
				<Image
					style={{ width: 100, height: 100, resizeMode: 'contain' }}
					source={{
						uri: 'https://links.papareact.com/gzs',
					}}
				/>
				<GooglePlacesAutocomplete
					nearbyPlacesAPI="GooglePlacesSearch"
					styles={{
						container: {
							flex: 0,
						},
						textInput: {
							fontSize: 18,
						},
					}}
					enablePoweredByContainer={false}
					minLength={2}
					returnKeyType="search"
					onPress={(data, details = null) => {
						console.log(data, details)
					}}
					placeholder="Where from?"
					query={{
						key: GOOGLE_MAPS_APIKEY,
						language: 'en',
					}}
				/>
				<NavOptions />
			</View>
		</SafeAreaView>
	)
}

export default HomeScreen

import {
	Keyboard,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import Map from '../components/Map'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'
import tailwind from 'twrnc'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
const MapScreen = () => {
	const Stack = createNativeStackNavigator()
	const [keyboardStatus, setKeyboardStatus] = useState(false)
	const navigation = useNavigation()

	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
			setKeyboardStatus(true)
		})
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
			setKeyboardStatus(false)
		})

		return () => {
			showSubscription.remove()
			hideSubscription.remove()
		}
	}, [])

	return (
		<View>
			<TouchableOpacity
				style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
				onPress={() => navigation.navigate('HomeScreen')}
			>
				<Icon name="menu" />
			</TouchableOpacity>
			<View style={tw`h-${keyboardStatus ? '1/4' : '1/2'}`}>
				<Map />
			</View>
			<View style={tw`h-${keyboardStatus ? '3/4' : '1/2'}`}>
				<Stack.Navigator>
					<Stack.Screen
						name="NavigateCard"
						component={NavigateCard}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="RideOptionsCard"
						component={RideOptionsCard}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</View>
		</View>
	)
}

export default MapScreen

const styles = StyleSheet.create({})

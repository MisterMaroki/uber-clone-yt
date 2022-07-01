import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import Map from '../components/Map'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'
import tailwind from 'twrnc'
const MapScreen = () => {
	const Stack = createNativeStackNavigator()
	const [keyboardStatus, setKeyboardStatus] = useState(false)

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
		<>
			<View style={tw`h-${keyboardStatus ? '1/4' : '91/200'}`}>
				<Map />
			</View>
			<View style={tw`h-${keyboardStatus ? '3/4' : '103/200'}`}>
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
		</>
	)
}

export default MapScreen

const styles = StyleSheet.create({})

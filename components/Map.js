import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import tw from 'twrnc'
import { useSelector } from 'react-redux'
import { selectDestination, selectOrigin } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useRef } from 'react'
const Map = () => {
	const origin = useSelector(selectOrigin)
	const destination = useSelector(selectDestination)

	const mapRef = useRef(null)

	useEffect(() => {
		if (!origin || !destination) return
		mapRef.current.fitToCoordinates([origin, destination], {
			edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
		})
	}, [origin, destination])

	return (
		<MapView
			ref={mapRef}
			style={tw`flex-1`}
			mapType="mutedStandard"
			initialRegion={{
				latitude: origin.location.lat,
				longitude: origin.location.lng,
				latitudeDelta: 0.05,
				longitudeDelta: 0.05,
			}}
		>
			{origin && destination && (
				<MapViewDirections
					origin={origin.description}
					destination={destination.description}
					apikey={GOOGLE_MAPS_APIKEY}
					strokeWidth={3}
					strokeColor="black"
				/>
			)}
			{origin?.location && (
				<Marker
					coordinate={{
						latitude: origin.location.lat,
						longitude: origin.location.lng,
					}}
					title="Origin"
					description={origin.description}
					indentifier="origin"
				/>
			)}
			{destination?.location && (
				<Marker
					coordinate={{
						latitude: destination.location.lat,
						longitude: destination.location.lng,
					}}
					title="Destination"
					description={destination.description}
					indentifier="destination"
				/>
			)}
		</MapView>
	)
}

export default Map

const styles = StyleSheet.create({})

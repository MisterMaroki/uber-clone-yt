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
		if (origin && !destination) {
			mapRef.current.fitToCoordinates(
				[
					{
						latitude: origin.location.lat,
						longitude: origin.location.lng,
					},
				],
				{
					edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
					animated: true,
				}
			)
		} else if (origin && destination) {
			mapRef.current.fitToCoordinates(
				[
					{
						latitude: origin.location.lat,
						longitude: origin.location.lng,
					},
					{
						latitude: destination.location.lat,
						longitude: destination.location.lng,
					},
				],
				{
					edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
					animated: true,
				}
			)
		}
	}, [origin, destination])

	return (
		<MapView
			ref={mapRef}
			style={tw`flex-1`}
			mapType="mutedStandard"
			initialRegion={{
				latitude: origin?.location?.lat ?? 50.7914488,
				longitude: origin?.location?.lng ?? 0.0160575,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005,
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

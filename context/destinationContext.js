import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createContext } from 'react'
import { useContext } from 'react'

const Input = createContext()

const DestinationContext = ({ children }) => {
	const [input, setInput] = useState('')

	return <Input.Provider value={{ input, setInput }}>{children}</Input.Provider>
}

export default DestinationContext

export const DestinationState = () => useContext(Input)

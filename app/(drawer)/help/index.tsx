import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Help = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Help Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Makes the container fill the screen
        justifyContent: 'center', // Centers content vertically
        alignItems: 'center', // Centers content horizontally
    },
    text: {
        fontSize: 24, // Optional: adjust text size as needed
    }
})

export default Help

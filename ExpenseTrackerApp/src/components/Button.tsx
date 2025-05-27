import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({ name, onPress = () => { } }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button} >
            <Text style={styles.buttonText}>{name}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000',
        height: 60,
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        // fontWeight: 'bold',
    },
})
import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
    const handleAddExpense = () => {
        navigation.navigate('AddExpenses');
    };
    const handleViewExpenses = () => {
        navigation.navigate('ViewExpenses');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>LC Corporate assignment</Text>
            </View>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/logo.png')}
                    style={{ width: 80, height: 80, borderRadius: 40 }} />
                <Text style={{ fontSize: 24, marginTop: 10, fontWeight: 'bold' }}>Expense Tracker</Text>
                <Text style={{ fontSize: 14, color: '#808080' }}>Track your expenses easily and efficiently.</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button name="Add Expense" onPress={handleAddExpense} />
                <Button name="View Expenses" onPress={handleViewExpenses} />

            </View>
            <View style={styles.footerContainer}>
                <Text style={styles.footerHead}>Submitted By :</Text>
                <Text style={styles.footerText}>Yuvraj Yadav</Text>
                <Text style={styles.footerHead}>Contact :</Text>
                <Text style={styles.footerText}>https://yuvrajyadav.tech</Text>
                <Text style={styles.footerText}>yuvraj7000raju@gmail.com</Text>
                <Text style={styles.footerText}>+91 7000810999</Text>
            </View>


        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingVertical: 20,
    },
    header: {
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 15,
    },
    buttonContainer: {
        width: '70%',
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    footerContainer: {
        width: '90%',
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,

    },
    footerHead: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    footerText: {
        fontSize: 14,
        marginBottom: 5,
    },

})
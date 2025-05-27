import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from './screens/Home';
import AddExpenses from './screens/AddExpenses';
import ViewExpenses from './screens/ViewExpenses';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
   <NavigationContainer>
         <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
            <Stack.Screen name="AddExpenses" component={AddExpenses} options={{headerShown: false}} />
            <Stack.Screen name="ViewExpenses" component={ViewExpenses} options={{headerShown: false}} />
         </Stack.Navigator>
    </NavigationContainer> 
    </SafeAreaView>
  )
}

export default App




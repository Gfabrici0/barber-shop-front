import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './screens/Login';
import RegisterType from './screens/RegisterType';
import RegisterBarber from './screens/RegisterBarberShop';
import RegisterClient from './screens/RegisterClient';
import HomeScreen from './screens/Home';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <>
    <StatusBar  backgroundColor="#fff" />
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" component={LoginScreen} options={{ title: '', animationTypeForReplace: 'push'}} />
          <Stack.Screen name='registerType' component={RegisterType} options={{ title: ''}}/>
          <Stack.Screen name='registerBarber' component={RegisterBarber} options={{ title: ''}}/>
          <Stack.Screen name='registerClient' component={RegisterClient} options={{ title: ''}}/>
        </Stack.Group>
        <Stack.Group screenOptions={{ headerShown: true }}>
          <Stack.Screen name='home' component={HomeScreen} options={{ title: ''}}/>
          {/* Adicione outras telas principais aqui */}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
    </>
  )
}

export default Navigator;
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './screens/Login';
import RegisterType from './screens/RegisterType';
import RegisterBarber from './screens/RegisterBarberShop';
import RegisterClient from './screens/RegisterClient';

function Navigator() {
  const Stack = createNativeStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: '', animationTypeForReplace: 'push'}} />
        <Stack.Screen name='RegisterType' component={RegisterType} options={{ title: ''}}/>
        <Stack.Screen name='RegisterBarber' component={RegisterBarber} options={{ title: ''}}/>
        <Stack.Screen name='RegisterClient' component={RegisterClient} options={{ title: ''}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator;
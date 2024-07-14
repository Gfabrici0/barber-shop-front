import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './screens/Login';
import RegisterType from './screens/RegisterType';
import RegisterClient from './screens/RegisterClient';
import AppoimentScreen from './screens/Appoiment';
import { StatusBar } from 'expo-status-bar';
import BarberServices from './screens/BarberServices';
import EditProfile from './screens/Profile';
import Demand from './screens/Demand';
import Home from './screens/Home';
import ForgotPasswordInputEmailScreen from './screens/ForgotPassword/Email';
import ForgotPasswordScreen from './screens/ForgotPassword/Password';
import RegisterBarberShopScreen from './screens/RegisterBarberShop';
import BarbershopRegisterScreen from './screens/BarberRegisterScreen';

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
          <Stack.Screen name='registerBarbershop' component={RegisterBarberShopScreen} options={{ title: ''}}/>
          <Stack.Screen name='registerClient' component={RegisterClient} options={{ title: ''}}/>
          <Stack.Screen name='forgotPasswordInputEmail' component={ForgotPasswordInputEmailScreen} options={{ title: ''}}/>
          <Stack.Screen name='forgotPassword' component={ForgotPasswordScreen} options={{ title: ''}}/>
        </Stack.Group>
        <Stack.Group screenOptions={{ headerShown: true }}>
          <Stack.Screen name='home' component={Home} options={{ title: ''}}/>
          <Stack.Screen name='appoiment' component={AppoimentScreen} options={{ title: ''}}/>
          <Stack.Screen name='barberServices' component={BarberServices} options={{ title: ''}}/>
          <Stack.Screen name='registerBarber' component={BarbershopRegisterScreen} options={{ title: ''}}/>
          <Stack.Screen name='demand' component={Demand} options={{ title: ''}}/>
          <Stack.Screen name='profile' component={EditProfile} options={{ title: ''}}/>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
    </>
  )
}

export default Navigator;
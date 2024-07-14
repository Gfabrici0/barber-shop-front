import React, { useEffect, useState } from 'react';
import { styles } from './style';
import { Alert, ImageBackground, Text } from 'react-native';
import { 
  Input,
  Icon, 
  Button
} from '@rneui/base';
import { useTheme } from '@rneui/themed';
import { Link } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AuthToken from '../../services/Store/AuthToken';
import UserStore from '../../services/Store/UserStore';
import Config from 'react-native-config';
import Constants from 'expo-constants';
const image = require('../../../assets/background.png');

function LoginScreen() {

  const navigation = useNavigation()

  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: 'black'
      },
      headerTintColor: 'white', 
    });
  })

  const handleLogin = async () => {
    try {
      const baseUrl = Constants.expoConfig?.extra?.BASE_URL;
      const response = await axios.post(`http://192.168.3.16:8080/login`, {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      await UserStore.storeUserData(response.data);
      await AuthToken.storeToken(response.data.token);
      navigation.navigate('home' as never);
    } catch (error) {
      Alert.alert("Erro de Login", "Verifique suas credenciais e tente novamente.");
    }
  };


  return (
      <ImageBackground source={image} resizeMode="cover" style={styles.containerImage}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>
            Olá! Seja Bem Vindo!
          </Text>
          <Input
            placeholder='Email'
            inputContainerStyle={styles.input}
            containerStyle={{ paddingHorizontal: 0 }}
            underlineColorAndroid='transparent'
            leftIcon={<Icon name='email' />}
            onChangeText={setEmail}
            value={email}
          />
          <Input
            placeholder='Senha'
            inputContainerStyle={styles.input}
            containerStyle={{ paddingHorizontal: 0 }}
            underlineColorAndroid='transparent'
            leftIcon={<Icon name='lock' />}
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />
          <Button
            title={'Entrar'}
            size='md'
            color={theme.theme.colors.secondary}
            containerStyle={{ width: '100%', borderRadius: 10}}
            onPress={handleLogin}
          />
          <Text style={styles.text}>
            Esqueceu sua senha? <Link style={styles.link} to={'/forgotPasswordInputEmail'}>Recuperar senha</Link>
          </Text>
          <Text style={styles.text}>
            Ainda não tem uma conta? <Link style={styles.link} to={'/registerType'}>Cadastre-se</Link>
          </Text>
        </SafeAreaView>
      </ImageBackground>
  );
}

export default LoginScreen;
import React, { useEffect } from 'react';
import { styles } from './style';
import { ImageBackground, Text } from 'react-native';
import { 
  Input,
  Icon, 
  Button
} from '@rneui/base';
import { Header, useTheme } from '@rneui/themed';
import { Link } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
const image = require('../../../assets/background.png');

function LoginScreen() {

  const navigation = useNavigation()

  const theme = useTheme();

  
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: 'black'
      },
      headerTintColor: 'white', 
    });
  })


  return (
      <ImageBackground source={image} resizeMode="cover" style={styles.containerImage}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>
            Olá! Seja Bem Vindo!
          </Text>
          <Input
            placeholder='Email'
            inputContainerStyle={styles.input}
            containerStyle={{paddingHorizontal: 0}}
            underlineColorAndroid='transparent'
            leftIcon={<Icon name='email' />}
          />
          <Input 
            placeholder='Senha'
            inputContainerStyle={styles.input}
            containerStyle={{paddingHorizontal: 0}}
            underlineColorAndroid='transparent'
            leftIcon={<Icon name='key' />}
          />
          <Button
            title={'Entrar'}
            size='md'
            color={theme.theme.colors.secondary}
            containerStyle={{ width: '100%', borderRadius: 10, marginTop: 10 }}
            onPress={ () => navigation.navigate('RegisterType' as never)}
          />
          <Text style={{marginTop: 20}}>
            Esqueceu sua senha? Recuperar senha
          </Text>
          <Text>
            Ainda não tem uma conta? Cadastre-se
          </Text>
        </SafeAreaView>
      </ImageBackground>
  );
}

export default LoginScreen;
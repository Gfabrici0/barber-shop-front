import React, { useEffect } from 'react'

import { ImageBackground, ScrollView, Text, View } from 'react-native'
import { Button, Icon, Input } from '@rneui/base';
import { useTheme } from '@rneui/themed';
import { Link, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { StatusBar } from 'expo-status-bar';

const image = require('../../../assets/background.png');

export default function RegisterClient() {

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
          <Text style={styles.title}>Cadastro de Cliente</Text>
          <Input 
            placeholder='Insira seu nome completo'
            inputContainerStyle={styles.input}
            containerStyle={{paddingHorizontal: 0}}
            underlineColorAndroid='transparent'
          />

          <Input 
            placeholder='CPF'
            inputContainerStyle={styles.input}
            containerStyle={{paddingHorizontal: 0}}
            underlineColorAndroid='transparent'
          />
          <Input
            placeholder='Insira seu email'
            inputContainerStyle={styles.input}
            containerStyle={{paddingHorizontal: 0}}
            underlineColorAndroid='transparent'
          />
          <Input
            placeholder='Data de nascimento'
            inputContainerStyle={styles.input}
            containerStyle={{paddingHorizontal: 0}}
            underlineColorAndroid='transparent'
          />
          <Input
            placeholder='Número do celular'
            inputContainerStyle={styles.input}
            containerStyle={{paddingHorizontal: 0}}
            underlineColorAndroid='transparent'
          />
          <Input
            placeholder='Crie uma senha'
            inputContainerStyle={styles.input}
            containerStyle={{paddingHorizontal: 0}}
            underlineColorAndroid='transparent'
          />
          <Input
            placeholder='Confimar senha'
            inputContainerStyle={styles.input}
            containerStyle={{paddingHorizontal: 0}}
            underlineColorAndroid='transparent'
          />
          <Button
            title={'Cadastrar'}
            size='md'
            color={theme.theme.colors.secondary}
            containerStyle={{ width: '100%', borderRadius: 10 }}
            onPress={ () => navigation.navigate('BarberServices' as never)}
          />
          <Text style={styles.text}>
            Já possui uma conta? <Link style={styles.link} to='/Login'>Faça login</Link>
          </Text>
      </SafeAreaView>
    </ImageBackground>
  )
}
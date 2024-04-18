import React, { useEffect } from 'react'

import { ImageBackground, ScrollView, Text, View } from 'react-native'
import { styles } from './styles';
import { Button, Icon, Input } from '@rneui/base';
import { useTheme } from '@rneui/themed';
import { Link, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const image = require('../../../assets/background.png');

export default function RegisterBarberShop() {

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
          <Text style={styles.title}>Cadastro de Barbearia</Text>
          <Input 
            placeholder='Insira o nome da barbearia'
            inputContainerStyle={styles.input}
            containerStyle={{paddingHorizontal: 0}}
            underlineColorAndroid='transparent'
          />

          <Input 
            placeholder='CNPJ'
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
            placeholder='Cidade'
            inputContainerStyle={styles.input}
            containerStyle={{paddingHorizontal: 0}}
            underlineColorAndroid='transparent'
          />
          <Input
            placeholder='Rua'
            inputContainerStyle={styles.input}
            containerStyle={{paddingHorizontal: 0}}
            underlineColorAndroid='transparent'
          />
          <Input
            placeholder='CEP'
            inputContainerStyle={styles.input}
            containerStyle={{paddingHorizontal: 0}}
            underlineColorAndroid='transparent'
          />
          <Input
            placeholder='Número'
            inputContainerStyle={styles.input}
            containerStyle={{paddingHorizontal: 0}}
            underlineColorAndroid='transparent'
          />
          <Input
            placeholder='Número de celular'
            inputContainerStyle={styles.input}
            containerStyle={{paddingHorizontal: 0}}
            underlineColorAndroid='transparent'
          />
          <Button
            title={'Cadastrar'}
            size='md'
            color={theme.theme.colors.secondary}
            containerStyle={{ width: '100%', borderRadius: 10, marginTop: 10 }}
            onPress={ () => navigation.navigate('BarberServices' as never)}
          />
          <Text style={styles.text}>
            Já tem uma conta? <Link style={styles.link} to='/Login'>Faça login</Link>
          </Text>
      </SafeAreaView>
    </ImageBackground>
  )
}
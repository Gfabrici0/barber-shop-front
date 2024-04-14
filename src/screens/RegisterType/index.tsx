import React, { useEffect } from 'react'

import { ImageBackground, Text, View } from 'react-native'
import { styles } from './styles';
import { Button } from '@rneui/base';
import { useTheme } from '@rneui/themed';
import { Link, useNavigation } from '@react-navigation/native';

const image = require('../../../assets/background.png');

export default function RegisterTypeScreen() {

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
      <View>
        <Text style={styles.title}>Escolha o tipo de cadastro</Text>
        <View style={styles.contentContaner}>
          <Button
            title='Cadastrar Barbearia'
            size='md'
            onPress={ () => navigation.navigate('RegisterBarber' as never)}
            color={theme.theme.colors.secondary}
            containerStyle={{ width: '100%', borderRadius: 20, marginTop: 10}}
          />
          <Button
            title='Cadastrar Cliente'
            size='md'
            onPress={ () => navigation.navigate('RegisterClient' as never)}
            color={theme.theme.colors.secondary}
            containerStyle={{ width: '100%', borderRadius: 20, marginTop: 10}}
          />
          <Text>
            Já tem cadastro? Volte a tela inicial.
          </Text>
        </View>
      </View>
    </ImageBackground>
  )
}
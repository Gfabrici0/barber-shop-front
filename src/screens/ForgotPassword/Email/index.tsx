import React, { useEffect } from 'react';
import { styles } from './style';
import { ImageBackground, Text } from 'react-native';
import { 
  Input,
  Icon, 
  Button
} from '@rneui/base';
import { useTheme } from '@rneui/themed';
import { Link } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
const image = require('../../../../assets/background.png');

function ForgotPasswordInputEmailScreen() {

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
            Recuperar Senha
          </Text>
          <Input
            placeholder='Email'
            inputContainerStyle={styles.input}
            containerStyle={{paddingHorizontal: 0}}
            underlineColorAndroid='transparent'
            leftIcon={<Icon name='email' />}
          />          
          <Button
            title={'Enviar'}
            size='md'
            color={theme.theme.colors.secondary}
            containerStyle={{ width: '100%', borderRadius: 10 }}
            onPress={ () => navigation.navigate('forgotPassword' as never)}
          />
          <Text style={styles.text}>
            Já possui uma conta? <Link style={styles.link} to='/login'>Faça login</Link>
          </Text>
        </SafeAreaView>
      </ImageBackground>
  );
}

export default ForgotPasswordInputEmailScreen;
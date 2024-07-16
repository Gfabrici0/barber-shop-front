import React, { useEffect, useState } from 'react'

import { ImageBackground, ScrollView, Text, View } from 'react-native'
import { styles } from './styles';
import { Button, Icon, Input } from '@rneui/base';
import { useTheme } from '@rneui/themed';
import { Link, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { barbershopService } from '../../services/BarbershopService';
import { TextInputMask } from 'react-native-masked-text';
import { handleTextChange, isValidCNPJ, removeFormatting } from '../../utils/formData.utils';

const image = require('../../../assets/background.png');

export default function RegisterBarberShopScreen() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [cnpjError, setCnpjError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [barbershopZipCode, setBarbershopZipCode] = useState('');
  const [personalZipCode, setPersonalZipCode] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    validatePasswords(value, confirmPassword);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    validatePasswords(password, value);
  };

  const validatePasswords = (pass: string, confirmPass: string) => {
    if (pass !== confirmPass) {
      setPasswordError('As senhas não coincidem.');
    } else {
      setPasswordError('');
      setFormData({ ...formData, password: pass });
    }
  };

  const [formData, setFormData] = useState({
    ownerName: '',
    tradeName: '',
    corporateName: '',
    email: '',
    password: '',
    document: '',
    phoneNumber: '',
    dateOfBirth: '',
    barbershopAddress: {
      addressCity: '',
      addressStreet: '',
      addressNumber: ''
    },
    personalAddress: {
      addressCity: '',
      addressStreet: '',
      addressNumber: ''
    }
  });

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: 'black'
      },
      headerTintColor: 'white',
    });
  }, [navigation]);

  function convertToDate(dateStr: string): Date {
    const parts = dateStr.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }

  const redirect = () => navigation.navigate("login" as never);

  const handleSubmit = async () => {
    const data = {
      ...formData,
      dateOfBirth: convertToDate(formData.dateOfBirth),
      document: removeFormatting(formData.document),
      phoneNumber: removeFormatting(formData.phoneNumber)
    };

    if (cnpjError || passwordError || dateOfBirthError) {
      alert("Por favor, corrija os erros no formulário antes de prosseguir.");
      return; 
    }
  
    try {
      await barbershopService.createBarbershop(data);
      redirect();
    } catch (error) {
      console.error('Failed to create barbershop:', error);
    }
  };

  const handleCnpjChange = handleTextChange((value: string) => {
    if (isValidCNPJ(value)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        document: value
      }));
      setCnpjError('');
    } else {
      setCnpjError('CNPJ inválido');
    }
  });

  const handlePhoneNumberChange = handleTextChange((value: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, phoneNumber: value }));
  });

  const handleZipCodeFromBarbershopChange = handleTextChange((value: string) => {
    const unformattedValue = removeFormatting(value);
    setBarbershopZipCode(unformattedValue);
    setFormData(prevFormData => ({
      ...prevFormData,
      barbershopAddress: {
          ...prevFormData.barbershopAddress,
          addressNumber: unformattedValue
      }
    }));
  });

  const handleZipCodeFromUserChange = handleTextChange((value: string) => {
    const unformattedValue = removeFormatting(value);
    setPersonalZipCode(unformattedValue);
    setFormData(prevFormData => ({
      ...prevFormData,
      personalAddress: {
          ...prevFormData.personalAddress,
          addressNumber: unformattedValue
      }
    }));
  });

  const handleDateChange = (formattedDate: string) => {
    const selectedDate = convertToDate(formattedDate);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); 
  
    if (selectedDate > currentDate) {
      setDateOfBirthError('A data de nascimento não pode ser maior que a data atual.');
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        dateOfBirth: formattedDate
      }));
      setDateOfBirthError('');
    }
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.containerImage}>
      <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Cadastro de Barbearia</Text>
          <ScrollView style={styles.scrollView}>
            <Input 
              placeholder='Nome corporativo da barbearia'
              inputContainerStyle={styles.input}
              containerStyle={{paddingHorizontal: 0}}
              underlineColorAndroid='transparent'
              leftIcon={<Icon name='user' type='font-awesome' />}
              onChangeText={(value) => setFormData({...formData, corporateName: value})}
            />
            <Input 
              placeholder='Nome da barbearia'
              inputContainerStyle={styles.input}
              containerStyle={{paddingHorizontal: 0}}
              underlineColorAndroid='transparent'
              leftIcon={<Icon name='user' type='font-awesome' />}
              onChangeText={(value) => setFormData({...formData, tradeName: value})}
            />
            <Input 
              placeholder='Nome do dono da barbearia'
              inputContainerStyle={styles.input}
              containerStyle={{paddingHorizontal: 0}}
              underlineColorAndroid='transparent'
              leftIcon={<Icon name='user' type='font-awesome' />}
              onChangeText={(value) => setFormData({...formData, ownerName: value})}
            />
            <TextInputMask
              type={'cnpj'}
              options={{
                format: '00.000.000/0000-00'
              }}
              placeholder='CNPJ - 00.000.000/0000-00'
              keyboardType='numeric'
              onChangeText={handleCnpjChange}
              value={formData.document}
              customTextInput={Input}
              customTextInputProps={{
                inputContainerStyle: styles.input,
                containerStyle: { paddingHorizontal: 0 },
                underlineColorAndroid: 'transparent',
                leftIcon: <Icon name='badge' />,
              }}
            />
            {cnpjError ? <Text style={{ color: 'red', marginLeft: 10 }}>{cnpjError}</Text> : null}
            <TextInputMask
              placeholder='Celular - (99) 99999-9999'
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) '
              }}
              value={formData.phoneNumber}
              onChangeText={handlePhoneNumberChange}
              keyboardType='numeric'
              customTextInput={Input}
              customTextInputProps={{
                inputContainerStyle: styles.input,
                containerStyle: { paddingHorizontal: 0 },
                underlineColorAndroid: 'transparent',
                leftIcon: <Icon name='phone' />,
                value: formData.phoneNumber,
                onChangeText: handlePhoneNumberChange,
              }}
            />
            <Input
              placeholder='Insira seu email'
              inputContainerStyle={styles.input}
              containerStyle={{paddingHorizontal: 0}}
              underlineColorAndroid='transparent'
              leftIcon={<Icon name='email' />}
              onChangeText={(value) => setFormData({...formData, email: value})}
            />
            <TextInputMask
              placeholder='Data de Nascimento'
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY'
              }}
              keyboardType='numeric'
              customTextInput={Input}
              customTextInputProps={{
                inputContainerStyle: styles.input,
                containerStyle: { paddingHorizontal: 0 },
                underlineColorAndroid: 'transparent',
                leftIcon: <Icon name="date-range" color="black" />,
              }}
              onChangeText={handleDateChange}
            />
            {dateOfBirthError ? <Text style={{ color: 'red', marginLeft: 10 }}>{dateOfBirthError}</Text> : null}
            <Input
              placeholder='Cidade da barbearia'
              inputContainerStyle={styles.input}
              containerStyle={{paddingHorizontal: 0}}
              underlineColorAndroid='transparent'
              leftIcon={<Icon name='home' />}
              onChangeText={(value) => setFormData({...formData, barbershopAddress: {...formData.barbershopAddress, addressCity: value}})}
            />
            <Input
              placeholder='Rua da barbearia'
              inputContainerStyle={styles.input}
              containerStyle={{paddingHorizontal: 0}}
              underlineColorAndroid='transparent'
              leftIcon={<Icon name='home' />}
              onChangeText={(value) => setFormData({...formData, barbershopAddress: {...formData.barbershopAddress, addressStreet: value}})}
            />
            <TextInputMask
              type={'custom'}
              options={
                {
                  mask: '99999-999'
                }
              }
              placeholder='CEP da barbearia - 00000-000'
              keyboardType='numeric'
              onChangeText={handleZipCodeFromBarbershopChange}
              value={formData.barbershopAddress.addressNumber}
              customTextInput={Input}
              customTextInputProps={{
                inputContainerStyle: styles.input,
                containerStyle: { paddingHorizontal: 0 },
                underlineColorAndroid: 'transparent',
                leftIcon: <Icon name='home' />,
              }}
            />
            <Input
              placeholder='Cidade em que reside'
              inputContainerStyle={styles.input}
              containerStyle={{paddingHorizontal: 0}}
              underlineColorAndroid='transparent'
              leftIcon={<Icon name='home' />}
              onChangeText={(value) => setFormData({...formData, personalAddress: {...formData.personalAddress, addressCity: value}})}
            />
            <Input
              placeholder='Rua em que reside'
              inputContainerStyle={styles.input}
              containerStyle={{paddingHorizontal: 0}}
              underlineColorAndroid='transparent'
              leftIcon={<Icon name='home' />}
              onChangeText={(value) => setFormData({...formData, personalAddress: {...formData.personalAddress, addressStreet: value}})}
            />
            <TextInputMask
              type={'custom'}
              options={
                {
                  mask: '99999-999'
                }
              }
              placeholder='CEP em que reside - 00000-000'
              keyboardType='numeric'
              onChangeText={handleZipCodeFromUserChange}
              value={formData.personalAddress.addressNumber}
              customTextInput={Input}
              customTextInputProps={{
                inputContainerStyle: styles.input,
                containerStyle: { paddingHorizontal: 0 },
                underlineColorAndroid: 'transparent',
                leftIcon: <Icon name='home' />,
              }}
            />
                        <View>
              <Input
                secureTextEntry={true}
                value={password}
                onChangeText={handlePasswordChange}
                placeholder="Digite sua senha"
                leftIcon={<Icon name="lock" color="black" />}
                containerStyle={{paddingHorizontal: 0}}
                inputContainerStyle={{...styles.input, borderColor: isPasswordValid ? 'black' : 'red'}}                
              />
              <Input
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                placeholder="Confirme sua senha"
                leftIcon={<Icon name="lock" color="black" />}
                containerStyle={{paddingHorizontal: 0}}
                inputContainerStyle={{...styles.input, borderColor: isPasswordValid ? 'black' : 'red'}}            
              />
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>
          </ScrollView>
            <Button
              title={'Cadastrar'}
              size='md'
              color={theme.theme.colors.secondary}
              containerStyle={{ width: '100%', borderRadius: 10, marginTop: 10 }}
              onPress={() => handleSubmit()}
            />
          <Text style={styles.text}>
            Já tem uma conta? <Link style={styles.link} to='/login'>Faça login</Link>
          </Text>
      </SafeAreaView>
    </ImageBackground>
  )
}
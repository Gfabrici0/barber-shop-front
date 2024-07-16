import React, { useEffect, useState } from 'react'

import { ImageBackground, Text } from 'react-native'
import { Button, Icon, Input } from '@rneui/base';
import { useTheme } from '@rneui/themed';
import { Link, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { UserService } from '../../services/UserService';
import { ScrollView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { handleTextChange, isValidCPF, removeFormatting } from '../../utils/formData.utils';
import { View } from 'react-native';

const image = require('../../../assets/background.png');

export default function RegisterClientScreen() {

  const navigation = useNavigation()
  const theme = useTheme();
  const [cpfError, setCpfError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [personalZipCode, setPersonalZipCode] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPass: '',
    document: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: {
      addressStreet: '',
      addressNumber: '',
      addressCity: ''
    }
  });
  function convertToDate(dateStr:string) {
    const parts = dateStr.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }

  const handleSubmit = async () => {
    if (cpfError || passwordError || dateOfBirthError) {
      alert("Por favor, corrija os erros no formulário antes de prosseguir.");
      return; 
    }

    try {
      const formattedPhoneNumber = removeFormatting(formData.phoneNumber);
      const formattedDocument = removeFormatting(formData.document);


      const response = await UserService.registerUser({
        address: {
          ...formData.address
        },
        dateOfBirth: convertToDate(formData.dateOfBirth),
        document: formattedDocument,
        email: formData.email,
        password: formData.password,
        phoneNumber: formattedPhoneNumber,
        role: 'ROLE_USER',
        username: formData.username
      });
      navigation.navigate('login' as never)
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

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

  const handleCpfChange = handleTextChange((value: string) => {
    if (isValidCPF(value)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        document: value
      }));
      setCpfError('');
    } else {
      setCpfError('Cpf inválido');
    }
  });

  const handlePhoneNumberChange = handleTextChange((value: string) => {
    const unformattedValue = removeFormatting(value);
    setFormData((prevFormData) => ({ ...prevFormData, phoneNumber: unformattedValue }));
  });

  const handleZipCodeFromUserChange = handleTextChange((value: string) => {
    const unformattedValue = removeFormatting(value);
    setPersonalZipCode(unformattedValue);
    setFormData(prevFormData => ({
      ...prevFormData,
      address: {
          ...prevFormData.address,
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
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Cadastro de Cliente</Text>
          <Input 
            placeholder='Insira seu nome completo'
            inputContainerStyle={styles.input}
            containerStyle={{paddingHorizontal: 0}}
            underlineColorAndroid='transparent'
            leftIcon={<Icon name='user' type='font-awesome' />}
            onChangeText={(value) => setFormData({...formData, username: value})}
          />
          <TextInputMask
            type={'cpf'}
            options={{
              format: '000.000.000-00'
            }}
            placeholder='CPF - 000.000.000-00'
            keyboardType='numeric'
            onChangeText={handleCpfChange}
            value={formData.document}
            customTextInput={Input}
            customTextInputProps={{
              inputContainerStyle: styles.input,
              containerStyle: { paddingHorizontal: 0 },
              underlineColorAndroid: 'transparent',
              leftIcon: <Icon name='badge' />,
            }}
          />
          {cpfError ? <Text style={{ color: 'red', marginLeft: 10 }}>{cpfError}</Text> : null}
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
          <TextInputMask
            type={'custom'}
            options={
              {
                mask: '99999-999'
              }
            }
            placeholder='CEP - 00000-000'
            keyboardType='numeric'
            onChangeText={handleZipCodeFromUserChange}
            value={formData.address.addressNumber}
            customTextInput={Input}
            customTextInputProps={{
              inputContainerStyle: styles.input,
              containerStyle: { paddingHorizontal: 0 },
              underlineColorAndroid: 'transparent',
              leftIcon: <Icon name='home' />,
            }}
          />
          <Input
            placeholder='Endereço'
            inputContainerStyle={styles.input}
            containerStyle={{paddingHorizontal: 0}}
            underlineColorAndroid='transparent'
            leftIcon={<Icon name='home' />}
            onChangeText={(value) => setFormData({...formData, address:{
              ...formData.address, addressStreet: value,             
            }})}
          />
          <Input
            placeholder='Cidade'
            inputContainerStyle={styles.input}
            containerStyle={{paddingHorizontal: 0}}
            underlineColorAndroid='transparent'
            leftIcon={<Icon name='home' />}
            onChangeText={(value) => setFormData({...formData, address:{
              ...formData.address, addressCity: value,             
            }})}
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
            containerStyle={{ width: '100%', borderRadius: 10 }}
            onPress={handleSubmit}
          />
          <Text style={styles.text}>
            Já possui uma conta? <Link style={styles.link} to='/login'>Faça login</Link>
          </Text>
      </SafeAreaView>
    </ImageBackground>
  )
}
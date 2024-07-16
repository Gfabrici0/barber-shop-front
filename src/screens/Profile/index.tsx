import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import { Button, Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { Input, useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DropdownMenu } from '../../components/DropdownMenu';
import { styles } from './style';
import { UserService } from '../../services/UserService';
import { TextInputMask } from 'react-native-masked-text';
import UserStore from '../../services/Store/UserStore';

type DataUpdateAddress = {
  id: string;
  addressNumber: string;
  addressStreet: string;
  addressCity: string;
};

type DataUpdateUser = {
  username: string;
  password?: string;
  phoneNumber: string;
  address: DataUpdateAddress[];
};

type InitialValues = {
  username: string;
  addressId: string;
  addressNumber: string;
  addressStreet: string;
  addressCity: string;
  phoneNumber: string;
  password?: string;
  confirmPassword?: string;
};

const removeFormatting = (value: string): string => {
  return value.replace(/\D/g, '');
};

export default function EditProfile() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [addressId, setAddressId] = useState<string>('');
  const [addressStreet, setAddressStreet] = useState<string>('');
  const [addressCity, setAddressCity] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [addressNumber, setAddressNumber] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const [initialValues, setInitialValues] = useState<Partial<InitialValues>>({});

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleMenuItemPress = (screen: string) => {
    navigation.navigate(screen as never);
    toggleMenu();
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
    }
  };

  const handlePhoneNumberChange = (value: string) => {
    const unformattedValue = removeFormatting(value);
    setPhoneNumber(unformattedValue);
  };

  const handleZipCodeFromUserChange = (value: string) => {
    const unformattedValue = removeFormatting(value);
    setAddressNumber(unformattedValue);
  };

  const isValueChanged = (fieldName: keyof InitialValues, currentValue: string) => {
    return initialValues[fieldName] !== currentValue;
  };

  const buildUpdateObject = (): Partial<DataUpdateUser> => {
    const updateFields: Partial<DataUpdateUser> = {};
    if (isValueChanged('username', username)) updateFields['username'] = username;
    if (isValueChanged('addressStreet', addressStreet) || isValueChanged('addressCity', addressCity) || isValueChanged('addressNumber', addressNumber)) {
      updateFields['address'] = [{
        id: addressId,
        addressNumber,
        addressStreet,
        addressCity
      }];
    }
    if (isValueChanged('phoneNumber', phoneNumber)) updateFields['phoneNumber'] = phoneNumber;
    if (password && password === confirmPassword) {
      updateFields['password'] = password;
    }
    return updateFields;
  };

  const handleUpdateUser = async () => {
    const updateObject = buildUpdateObject();
    if (Object.keys(updateObject).length > 0) {
      const userId = await UserStore.getId();
      if (userId) {
        try {
          await UserService.updateUser(updateObject, userId);
          if (updateObject.username) {
            await UserStore.updateUserName(updateObject.username);
          }
          Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
          resetForm();
        } catch (error) {
          Alert.alert("Erro", "Não foi possível atualizar o perfil. Erro: " + error);
        }
      }
    } else {
      Alert.alert("Aviso", "Nenhuma alteração detectada.");
    }
  };

  const resetForm = () => {
    setUsername('');
    setAddressId('');
    setAddressStreet('');
    setAddressCity('');
    setPhoneNumber('');
    setAddressNumber('');
    setConfirmPassword('');
    setPassword('');
    setPasswordError('');
  };

  useEffect(() => {
    const loadUserData = async () => {
      const userId = (await UserStore.getId()) || '';
      const userData: DataUpdateUser = await UserService.getUserById(userId);
      const firstAddress = userData.address[0];

      setUsername(userData.username);
      setPhoneNumber(removeFormatting(userData.phoneNumber));
      setAddressId(firstAddress.id);
      setAddressStreet(firstAddress.addressStreet);
      setAddressCity(firstAddress.addressCity);
      setAddressNumber(removeFormatting(firstAddress.addressNumber));

      setInitialValues({
        username: userData.username,
        addressId: firstAddress.id,
        addressStreet: firstAddress.addressStreet,
        addressCity: firstAddress.addressCity,
        addressNumber: removeFormatting(firstAddress.addressNumber),
        phoneNumber: removeFormatting(userData.phoneNumber),
      });
    };

    loadUserData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Editar Perfil',
      headerRight: () => (
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name='menu' color={theme.theme.colors.white} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: theme.theme.colors.primary,
      },
      headerTintColor: theme.theme.colors.white,
      headerTitleStyle: {
        backgroundColor: theme.theme.colors.primary,
      },
    });
  }, [navigation, isMenuVisible]);

  return (
    <SafeAreaView style={styles.container}>
      {isMenuVisible && (
        <DropdownMenu handleMenuItemPress={handleMenuItemPress} />
      )}
      <Input 
        placeholder='Nome'
        value={username}
        inputContainerStyle={styles.input}
        containerStyle={{paddingHorizontal: 0}}
        underlineColorAndroid='transparent'
        leftIcon={<Icon name='user' type='font-awesome' />}
        onChangeText={setUsername}
      />
      <TextInputMask
        type={'custom'}
        options={{ mask: '99999-999' }}
        placeholder='CEP - 00000-000'
        keyboardType='numeric'
        value={addressNumber}
        onChangeText={handleZipCodeFromUserChange}
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
        value={addressStreet}
        inputContainerStyle={styles.input}
        containerStyle={{paddingHorizontal: 0}}
        underlineColorAndroid='transparent'
        leftIcon={<Icon name='home' />}
        onChangeText={setAddressStreet}
      />
      <Input
        placeholder='Cidade'
        value={addressCity}
        inputContainerStyle={styles.input}
        containerStyle={{paddingHorizontal: 0}}
        underlineColorAndroid='transparent'
        leftIcon={<Icon name='home' />}
        onChangeText={setAddressCity}
      />
      <TextInputMask
        type={'cel-phone'}
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) '
        }}
        placeholder='Celular - (99) 99999-9999'
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
        keyboardType='numeric'
        customTextInput={Input}
        customTextInputProps={{
          inputContainerStyle: styles.input,
          containerStyle: { paddingHorizontal: 0 },
          underlineColorAndroid: 'transparent',
          leftIcon: <Icon name='phone' />,
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
          inputContainerStyle={{...styles.input, borderColor: passwordError ? 'red' : 'black'}}
        />
        <Input
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          placeholder="Confirme sua senha"
          leftIcon={<Icon name="lock" color="black" />}
          containerStyle={{paddingHorizontal: 0}}
          inputContainerStyle={{...styles.input, borderColor: passwordError ? 'red' : 'black'}}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title='Salvar'
          size='md'
          color={theme.theme.colors.secondary}
          containerStyle={{ width: '100%', borderRadius: 10 }}
          onPress={handleUpdateUser}
        />
      </View>
    </SafeAreaView>
  );
}

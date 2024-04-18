import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DropdownMenu } from '../../components/DropdownMenu';
import { styles } from './style';

export default function EditProfile() {
  const theme = useTheme();

  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [activeButton, setActiveButton] = useState('');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [cep, setCep] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleButtonPress = (buttonName: React.SetStateAction<string>) => {
    setActiveButton(buttonName);
  };

  const handleMenuItemPress = (screen: string) => {
    navigation.navigate(screen as never);
    toggleMenu();
  };
  
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
      <View style={[styles.inputContainer, { borderColor: theme.theme.colors.secondary }]}>
        <TextInput
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          style={{ color: theme.theme.colors.secondary,borderColor: theme.theme.colors.secondary }}
          placeholderTextColor={theme.theme.colors.secondary}
        />
      </View>
      <View style={[styles.inputContainer, { borderColor: theme.theme.colors.secondary }]}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{ color: theme.theme.colors.secondary,borderColor: theme.theme.colors.secondary }}
          placeholderTextColor={theme.theme.colors.secondary}
        />
      </View>
      <View style={[styles.inputContainer, { borderColor: theme.theme.colors.secondary }]}>
        <TextInput
          placeholder="Rua"
          value={street}
          onChangeText={setStreet}
          style={{ color: theme.theme.colors.secondary }}
          placeholderTextColor={theme.theme.colors.secondary}
        />
      </View>
      <View style={[styles.inputContainer, { borderColor: theme.theme.colors.secondary }]}>
        <TextInput
          placeholder="Número"
          value={number}
          onChangeText={setNumber}
          keyboardType="numeric"
          style={{ color: theme.theme.colors.secondary,borderColor: theme.theme.colors.secondary }}
          placeholderTextColor={theme.theme.colors.secondary}
        />
      </View>
      <View style={[styles.inputContainer, { borderColor: theme.theme.colors.secondary }]}>
        <TextInput
          placeholder="Senha atual"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
          style={{ color: theme.theme.colors.secondary,borderColor: theme.theme.colors.secondary }}
          placeholderTextColor={theme.theme.colors.secondary}
        />
      </View>
      <View style={[styles.inputContainer, { borderColor: theme.theme.colors.secondary }]}>
        <TextInput
          placeholder="Nova senha"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          style={{ color: theme.theme.colors.secondary,borderColor: theme.theme.colors.secondary }}
          placeholderTextColor={theme.theme.colors.secondary}
        />
      </View>
      <View style={[styles.inputContainer, { borderColor: theme.theme.colors.secondary }]}>
        <TextInput
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={{ color: theme.theme.colors.secondary,borderColor: theme.theme.colors.secondary }}
          placeholderTextColor={theme.theme.colors.secondary}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.button, 
            {backgroundColor: activeButton === 'cancel' ? theme.theme.colors.secondary : 'white', 
            borderColor: theme.theme.colors.secondary},
          ]}
          onPress={() => handleButtonPress('cancel')}
        >
          <Text style={{color: activeButton === 'cancel' ? 'white' : theme.theme.colors.secondary}}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.button, 
            {backgroundColor: activeButton === 'edit' ? theme.theme.colors.secondary : 'white', 
            borderColor: theme.theme.colors.secondary},
          ]}
          onPress={() => handleButtonPress('edit')}
        >
          <Text style={{color: activeButton === 'edit' ? 'white' : theme.theme.colors.secondary}}>Editar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

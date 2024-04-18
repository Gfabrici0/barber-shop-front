import React, { useLayoutEffect, useState } from 'react';
import { styles } from './style';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  Button,
  Icon
} from '@rneui/base';
import { useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import servicesData from './mock/demandData.json';
import { useNavigation } from '@react-navigation/native';
import { DropdownMenu } from '../../components/DropdownMenu';

function Demand() {

  const navigation = useNavigation();
  const theme = useTheme();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleMenuItemPress = (screen: string) => {
    navigation.navigate(screen as never);
    toggleMenu();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Seus pedidos',
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
        <Text style={styles.welcomeText}>
            Bem Vindo, <Text style={{fontWeight: 'bold', color: '#632D0C'}}>{servicesData.profileName}</Text>
        </Text>
        <Text style={styles.description}>
            Esta é a sua lista de pedidos {'\n'}de agendamentos
        </Text>
        <Text style={styles.title}>Lista de Pedidos</Text>
        <ScrollView style={styles.scrollView}>
        {servicesData.cards.map((service) => (
            <View key={service.id} style={styles.card}>
                <Text style={styles.cardTitle}>{service.date}</Text>
                <Text style={styles.cardTitle}>{service.clientName}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Icon name="check" color={theme.theme.colors.check} onPress={() => console.log('Edit Pressed')} />
                    <Icon name="close" color={theme.theme.colors.close} onPress={() => console.log('Delete Pressed')} />
                </View>
            </View>
        ))}
        </ScrollView>
        <Button
        title="Cadastrar novo serviço"
        size="md"
        color={theme.theme.colors.secondary}
        containerStyle={styles.button}
        />
    </SafeAreaView>
  );
}

export default Demand;
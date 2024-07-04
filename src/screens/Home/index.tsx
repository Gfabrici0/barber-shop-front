import React, { useEffect, useLayoutEffect, useState } from 'react';
import { styles } from './style';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
  Button,
  Icon  
} from '@rneui/base';
import { useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { DropdownMenu } from '../../components/DropdownMenu';
import servicesData from "./mock/demandData.json";
import ScheduleModal from '../../components/modals/ScheduleModal';
import { barbershopService } from '../../services/BarbershopService';
import { Barbershop, Content } from '../../services/interface/barbershop.interface';
import UserStore from '../../services/Store/UserStore';

function Home() {

  const navigation = useNavigation();
  const theme = useTheme();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isScheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [selectedBarberShopId, setSelectedBarberShopId] = useState<string>();

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const [searchBarbershops, setSearchBarbershops] = useState<string>('');
  const [barbershops, setBarbershops] = useState<Content[]>([]);

  const fetchBarbershops = async (currentText: string) => {
    try {
      console.log(currentText)
      const response = await barbershopService.listBarbershops();
      setBarbershops(response.content ?? []);
    } catch (error) {
      console.error('Erro ao buscar barbearias:', error);
    }
  };

  useEffect(() => {
    fetchBarbershops(searchBarbershops);
  }, [searchBarbershops]);

  const handleMenuItemPress = (screen: string) => {
    navigation.navigate(screen as never);
    toggleMenu();
  };

  const handleSchedule = () => {
    toggleScheduleModal();
  };

  const toggleScheduleModal = () => {
    setScheduleModalVisible(!isScheduleModalVisible);
  };

  const [name, setName] = useState<string | null>(null);
        
  useEffect(() => {
    const fetchName = async () => {
      try {
        const name = await UserStore.getName();
        setName(name);
      } catch (error) {
        console.error('Error fetching name:', error);
      }
    };
  
    fetchName();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'home',
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
          Bem Vindo, <Text style={{fontWeight: 'bold', color: '#632D0C'}}>{name}</Text>
        </Text>
        <Text style={styles.description}>Buscar barbearia</Text>
        <View style={[styles.inputContainer, { borderColor: theme.theme.colors.secondary }]}>
          <TextInput
            style={{ color: theme.theme.colors.secondary,borderColor: theme.theme.colors.secondary }}
            placeholderTextColor={theme.theme.colors.secondary}
            onEndEditing={(e) => setSearchBarbershops(e.nativeEvent.text)}
          />
        </View>
        <Text style={styles.description}>Resultados Encontrados:</Text>
        <ScrollView style={styles.scrollView}>
          {
            barbershops.map((barbershop) => (
              <View key={barbershop.id} style={{...styles.card, backgroundColor: barbershop.id === selectedBarberShopId ? 'grey' : undefined}} onTouchEnd={() => setSelectedBarberShopId(barbershop.id)}>
                <Text style={styles.cardTitle}>{barbershop.tradeName}</Text>
              </View>
            ))
          }
        </ScrollView>
        <Button
          title="Agendar" 
          size="md"
          color={theme.theme.colors.secondary}
          containerStyle={styles.button}
          onPress={toggleScheduleModal}
        />
        {
          selectedBarberShopId && (
            <ScheduleModal
              visible={isScheduleModalVisible}
              onCancel={toggleScheduleModal}
              barberShopId={selectedBarberShopId}
            />
          )
        }
    </SafeAreaView>
  );
}

export default Home;
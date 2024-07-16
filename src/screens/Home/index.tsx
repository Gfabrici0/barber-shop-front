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
import { Barbers, Barbershop, Content } from '../../services/interface/barbershop.interface';
import UserStore from '../../services/Store/UserStore';

function Home() {

  const navigation = useNavigation();
  const theme = useTheme();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isScheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [selectedBarberShopId, setSelectedBarberShopId] = useState<string>();
  const [barbers, setBarbers] = useState<Barbers[]>([]);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const [searchBarbershops, setSearchBarbershops] = useState<string>('');
  const [barbershops, setBarbershops] = useState<Content[]>([]);

  const fetchBarbershops = async (currentText: string) => {
    try {
      const response = await barbershopService.listBarbershops(currentText);
      console.log('resposta: ',response.content ?? [])
      setBarbershops(response.content ?? []);
    } catch (error) {
      console.error('Erro ao buscar barbearias:', error);
    }
  };

  const fetchBarbershopByName = async (name: string) => {
      try {
        setSelectedBarberShopId("")
        const response = await barbershopService.findBarbershopByName(name);
        if (response) {
          setBarbershops(response);
        } else {
          setBarbershops([]);
        }
      } catch (error) {
        console.error('Erro ao buscar barbearia pelo nome:', error);
      }
  };


  const fetchBarbersFromBarbershop = async (barbershopId?: string) => {
    try {
      const response = await barbershopService.getBarbersFromBarbershop(barbershopId);
      console.log('barberirosss: ',response.barbers ?? [])
      setBarbers(response?.barbers ?? []);
    } catch (error) {
      console.error('Erro ao buscar barbeiros da barbearia:', error);
    }
  }


  useEffect(() => {
    fetchBarbershops(searchBarbershops);
    if(selectedBarberShopId) {
      console.log('selectedBarberShopId:', selectedBarberShopId);
      fetchBarbersFromBarbershop(selectedBarberShopId);
    }
  }, [searchBarbershops, selectedBarberShopId]);

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

  const [userRole, setUserRole] = useState<any>();
        
  console.log('barberirossss: ', barbers);
  useEffect(() => {
    const fetchName = async () => {
      try {
        const name = await UserStore.getName();
        setName(name);
      } catch (error) {
        console.error('Error fetching name:', error);
      }
    };

    const fetchRole = async () => {
      try {
        const role = await UserStore.getRole();

        setUserRole(role);
      } catch (error) {
        console.error('Error fetching role:', error);
      }
    }
    fetchRole();
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

  console.log('barbers:', barbers);
  console.log('selectedBarberSHo:', selectedBarberShopId);
  return (
    <SafeAreaView style={styles.container}>
      {isMenuVisible && (
        <DropdownMenu handleMenuItemPress={handleMenuItemPress} />
      )}
        <Text style={styles.welcomeText}>
          Bem Vindo, <Text style={{fontWeight: 'bold', color: '#632D0C'}}>{name}</Text>
        </Text>
        <Text style={styles.description}>Buscar barbearia</Text>
        <View>
        <View style={[styles.searchContainer, { borderColor: theme.theme.colors.secondary }]}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#999"
            onChangeText={(text) => setSearchBarbershops(text)}
            placeholder="Digite o nome da barbearia"
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => fetchBarbershopByName(searchBarbershops)}
          >
            <Icon name="search" size={20} color="#914111" />
          </TouchableOpacity>
      </View>
      </View>
        <Text style={styles.description}>Resultados Encontrados:</Text>
        <ScrollView style={styles.scrollView}>
          {
            barbershops.map((barbershop) => (
              <View key={barbershop.id} style={{...styles.card, backgroundColor: barbershop.id === selectedBarberShopId ? 'grey' : '#fff'}} onTouchEnd={() => setSelectedBarberShopId(barbershop.id)}>
                <Text style={styles.cardTitle}>{barbershop.tradeName}</Text>
              </View>
            ))
          }
        </ScrollView>
        {
          userRole === 'ROLE_USER' && (
            <Button
              title="Agendar"
              size="md"
              color={theme.theme.colors.secondary}
              containerStyle={styles.button}
              onPress={handleSchedule}
            />
          )
        }
        {
          selectedBarberShopId && isScheduleModalVisible && (
            <ScheduleModal
              visible={isScheduleModalVisible}
              onCancel={toggleScheduleModal}
              barberShopId={selectedBarberShopId}
              barbers={barbers}
            />
          )
        }
    </SafeAreaView>
  );
}

export default Home;
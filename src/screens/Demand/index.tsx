import React, { useEffect, useLayoutEffect, useState } from 'react';
import { styles } from './style';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  Button,
  Icon
} from '@rneui/base';
import { useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { DropdownMenu } from '../../components/DropdownMenu';
import UserStore from '../../services/Store/UserStore';
import { barberServicesService } from '../../services/BarberServices';
import DemandModal from '../../components/modals/DemandModal';

function Demand() {

  const navigation = useNavigation();
  const theme = useTheme();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [demands, setDemands] = useState<any[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDemand, setSelectedDemand] = useState<any | null>(null);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleMenuItemPress = (screen: string) => {
    navigation.navigate(screen as never);
    toggleMenu();
  };

  const fetchDemandsByUserBarberId = async (id: string) => {
    return await barberServicesService.getAppointmentsByUserBarberId(id);
  };

  const fetchDemandsByUserBarbershopId = async (id: string) => {
    return await barberServicesService.getAppointmentsByUserBarbershopId(id);
  };

  const updateDemandStatus = async (demand: any) => {
    await barberServicesService.updateDemandStatus(demand);
  };

  const fetchDemands = async () => {
    const userRole = await UserStore.getRole();
    const userId = await UserStore.getId() ?? '';
    
    if(userRole === 'ROLE_BARBER') {
      return await fetchDemandsByUserBarberId(userId);
    } else if ('ROLE_BARBERSHOP') {
      return await fetchDemandsByUserBarbershopId(userId);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() retorna 0-11
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const fetchPendingDemands = async () => {
    try {
      const data = await fetchDemands();
      setDemands(data);
    } catch (error) {
      console.error("Failed to fetch demands:", error);
    }
  };
  
  const acceptDemand = async (demandId: string) => {
    const updateData = {
      id: demandId,
      status: 'BARBER_APPROVED'
    };
    await barberServicesService.updateDemandStatus(updateData);
    await fetchPendingDemands();
  };
  
  const rejectDemand = async (demandId: string) => {
    const updateData = {
      id: demandId,
      status: 'BARBER_REJECTED'
    };
    await barberServicesService.updateDemandStatus(updateData);
    await fetchPendingDemands();
  };

  useEffect(() => {
    const fetchPendingDemands = async () => {
      try {
        const data = await fetchDemands();
        setDemands(data);
      } catch (error) {
        console.error('Error fetching demands:', error);
      }
    };

    const fetchName = async () => {
      try {
        const name = await UserStore.getName();
        setName(name);
      } catch (error) {
        console.error('Error fetching name:', error);
      }
    };

    fetchPendingDemands();
    fetchName();
  }, []);

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

  const openModalWithDemandData = (demand: any) => {
    setSelectedDemand(demand);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDemand(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isMenuVisible && (
        <DropdownMenu handleMenuItemPress={handleMenuItemPress} />
      )}
        <Text style={styles.welcomeText}>
            Bem Vindo, <Text style={{fontWeight: 'bold', color: '#632D0C'}}>{name}</Text>
        </Text>
        <Text style={styles.description}>
            Esta é a sua lista de pedidos {'\n'}de pedidos
        </Text>
        <Text style={styles.title}>Lista de Pedidos</Text>
        <ScrollView style={styles.scrollView}>
          {demands.map((demand) => (
            <TouchableOpacity key={demand.id} onPress={() => openModalWithDemandData(demand)}>
              <View key={demand.id} style={styles.card}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  <Text style={styles.cardTitle}>{formatDate(demand.date)}</Text>
                  <Text
                    style={{ ...styles.cardTitle, marginLeft: 5, flexShrink: 1 }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {demand.user.username}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name="check" color={theme.theme.colors.check} onPress={() => acceptDemand(demand.id)} />
                  <Icon name="close" color={theme.theme.colors.close} onPress={() => rejectDemand(demand.id)} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {
          isModalVisible && (
            <DemandModal demand={selectedDemand} onClose={closeModal} />
          )
        }
    </SafeAreaView>
  );
}

export default Demand;
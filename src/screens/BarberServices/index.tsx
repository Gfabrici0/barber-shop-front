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
import EditServiceModal from '../../components/modals/ServiceModal/EditServiceModal';
import RegisterServiceModal from '../../components/modals/ServiceModal/RegisterServiceModal';

function BarberServices() {

  const navigation = useNavigation();
  const theme = useTheme();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);


  const openCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalVisible(false);
  };

  const openEditModal = (service: any) => {
    setSelectedService(service);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };
  
  const handleMenuItemPress = (screen: string) => {
    navigation.navigate(screen as never);
    toggleMenu();
  };

  const [services, setServices] = useState<any[]>([]);

  const fetchServices = async () => {
    try {
      const barber = await barberServicesService.getBarberByEmail();
      const response = await barberServicesService.listServices(barber.id);
      setServices(response.content);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

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

  useEffect(() => {
    if (isUpdated) {
      fetchServices();
      setIsUpdated(false);
    }
  }, [isUpdated]);

  function deleteServie(id: string) {
    try {
      barberServicesService.deleteService(id);
      const newServices = services.filter((service) => service.id !== id);
      setServices(newServices);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Seus serviços',
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
        <Text style={styles.description}>
            Esta é a sua lista de serviços {'\n'}disponibilizados para seus clientes
        </Text>
        <Text style={styles.title}>Lista de Serviços</Text>
        {/* <ScrollView style={styles.scrollView}>
          {services.map((service) => (
              <View key={service.id} style={styles.card}>
                  <Text style={styles.cardTitle}>{service.serviceName}</Text>
                  <Text style={styles.cardTitle}>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(service.value)}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name="edit" color={theme.theme.colors.edit} onPress={() => openEditModal(service)} />
                    <Icon name="delete" color={theme.theme.colors.delete} onPress={() => deleteServie(service.id)} />
                  </View>
              </View>
          ))}
        </ScrollView> */}
        <ScrollView style={styles.scrollView}>
          {services.map((service) => (
            <View key={service.id} style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
                  {service.serviceName}
                </Text>
                <Text style={styles.cardValue}>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(service.value)}
                </Text>
                <View style={styles.iconContainer}>
                  <Icon name="edit" color={theme.theme.colors.edit} onPress={() => openEditModal(service)} />
                  <Icon name="delete" color={theme.theme.colors.delete} onPress={() => deleteServie(service.id)} />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <Button
          title="Cadastrar novo serviço"
          size="md"
          color={theme.theme.colors.secondary}
          containerStyle={styles.button}
          onPress={openCreateModal}
        />
        {isEditModalVisible && (
            <EditServiceModal
              service={selectedService}
              onClose={closeEditModal}
              onUpdate={() => setIsUpdated(true)}
            />
        )}
        {isCreateModalVisible && (
          <RegisterServiceModal
            onClose={closeCreateModal}
            onUpdate={() => setIsUpdated(true)}
          />
        )}
    </SafeAreaView>
  );
}

export default BarberServices;
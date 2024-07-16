import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { styles } from './styles';
import { Icon, useTheme } from '@rneui/themed';
import servicesData from "./mock/demandData.json";
import EditScheduleModal from '../modals/EditScheduleModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserStore from '../../services/Store/UserStore';
import axios from 'axios';
import AuthToken from '../../services/Store/AuthToken';

export interface Appointment {
  time: string;
  clientName: string;
}

async function deleteAppointment(id: string) {
  try {
    const token = await AuthToken.getToken();
    await axios.delete(`${process.env.BASE_URL}/scheduling/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return true;
  } catch (error) {
    console.error('Erro ao excluir o agendamento:', error);
    return false;
  }
}

const AppointmentSection = ({
  appointments,
  refreshAppointments,
}: {appointments:any[], refreshAppointments: any}) => {
  const [isScheduleModalVisible, setScheduleModalVisible] = useState(false);

  const handleEditOpen = () => {
    setScheduleModalVisible(true);
  };

  const handleSchedule = () => {
    toggleScheduleModal();
  };

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const role = await UserStore.getRole();
        setUserRole(role || '');
      } catch (error) {
        console.error('Error fetching role:', error);
      }
    };
    fetchRole();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza de que deseja excluir este agendamento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir', onPress: async () => {
            const success = await deleteAppointment(id);
            refreshAppointments();
          }
        },
      ]
    );
  };

  const toggleScheduleModal = () => {
    setScheduleModalVisible(!isScheduleModalVisible);
  };

  const theme = useTheme();

  const [userRole, setUserRole] = useState<string>();
  useEffect(()=>{
    const fetchRole = async () => {
      try {
        const role = await UserStore.getRole();
        setUserRole(role || '');
      } catch (error) {
        console.error('Error fetching role:', error);
      }
    }
    fetchRole();
  },[])

  return (
    <>
      <ScrollView style={styles.scrollView}>
        {appointments.map((service) => (
          <View key={service.id} style={styles.card}>
            <Text style={styles.cardTitle}>{service.date.slice(0,10)}</Text>
            <Text style={styles.cardTitle}>{service.date.slice(11)}</Text>
            <Text style={styles.cardTitle}>{service.user.username}</Text>
            <View style={{ flexDirection: 'row' }}>
              {/* {userRole != 'ROLE_USER' &&
                <Icon name="edit" color={theme.theme.colors.edit} onPress={handleEditOpen} />
              } */}
              {userRole != 'ROLE_USER' &&
                <Icon name="delete" color={theme.theme.colors.delete} onPress={() => handleDelete(service.id)} />
              }
            </View>
          </View>
        ))}
      </ScrollView>
      <EditScheduleModal
        visible={isScheduleModalVisible}
        onCancel={toggleScheduleModal}
        onSchedule={handleSchedule}
      />
    </>
  );
};

export default AppointmentSection;

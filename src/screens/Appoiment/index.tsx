import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon, useTheme } from '@rneui/themed';
import { styles } from './style';
import { Calendar } from 'react-native-calendars';
import AppointmentSection from '../../components/AppointmentCard';
import { DropdownMenu } from '../../components/DropdownMenu';
import UserStore from '../../services/Store/UserStore';
import { appointmentService } from '../../services/AppointmentService';

function AppoimentScreen() {

  const navigation = useNavigation();
  const theme = useTheme();
  const [isMenuVisible, setMenuVisible] = useState(false);
  
  const appointments = [
    { date: '2024-04-10' },
    { date: '2024-04-15' },
  ];

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const [appointment, setAppointment] = useState<any[]>([]);

  const fetchAppointments = async () => {
    try {
      const userId = await UserStore.getId() ?? '';
      const response = await appointmentService.fetchAppointmentByUserId(userId);
      console.log("response appointments: ", response)
      setAppointment(response.content);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    }
  };

  const handleMenuItemPress = (screen: string) => {
    navigation.navigate(screen as never);
    toggleMenu();
  };

  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
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

  const markedDates = appointments.reduce<{ [key: string]: { selected: true, marked: true } }>((acc, appointment) => {
    acc[appointment.date] = { selected: true, marked: true };
    return acc;
}, {});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Seus agendamentos',
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
        <Text style={[styles.title, {color: theme.theme.colors.primary}]}>
            Bem vindo, <Text style={{fontWeight: 'bold'}}>{name}</Text>
        </Text>
        <Text style={[{color: theme.theme.colors.primary}]}>Esta é a sua lista de horários de hoje, dia 10/04/2024</Text>
        <View style={styles.calendarContainer}>
          <Calendar 
            markedDates={markedDates} 
            theme={{
              selectedDayBackgroundColor: theme.theme.colors.primary,
              todayTextColor: theme.theme.colors.primary,
              arrowColor: theme.theme.colors.primary,
              monthTextColor: theme.theme.colors.primary,
              dayTextColor: theme.theme.colors.primary,
              agendaDayTextColor: theme.theme.colors.primary,
            }}  
          />
        </View>

        <Text style={[styles.subtitle, {color: theme.theme.colors.secondary}]}>Próximos Horários</Text>
        <AppointmentSection/>
    </SafeAreaView>
  );
}



export default AppoimentScreen;
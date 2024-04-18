import React, { useLayoutEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon, useTheme } from '@rneui/themed';
import { styles } from './style';
import { Calendar } from 'react-native-calendars';
import AppointmentCard from '../../components/AppointmentCard';

function HomeScreen() {

  const navigation = useNavigation();
  const theme = useTheme();
  
  const appointmentsRegisters = 
  [
    { time: '08:00', clientName: 'João' },
    { time: '09:00', clientName: 'Maria' },
    { time: '10:00', clientName: 'José' },
  ];
  
  const appointments = [
    { date: '2024-04-10' },
    { date: '2024-04-15' },
  ];

  const markedDates = appointments.reduce<{ [key: string]: { selected: true, marked: true } }>((acc, appointment) => {
    acc[appointment.date] = { selected: true, marked: true };
    return acc;
}, {});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Seus agendamentos',
      headerRight: () => (
        <Icon name='menu' color={theme.theme.colors.white}/>
      ),
      headerStyle: {
        backgroundColor: theme.theme.colors.primary, 
      },
      headerTintColor: theme.theme.colors.white,
      headerTitleStyle: {
        backgroundColor: theme.theme.colors.primary,
      },
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title, {color: theme.theme.colors.primary}]}>
          Bem vindo, <Text style={{fontWeight: 'bold'}}>Mateus Teixeira</Text>
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

      <Text style={[styles.secondTitle, {color: theme.theme.colors.secondary}]}>Próximos Horários</Text>
      {appointmentsRegisters.map((appointment, index) => (
        <AppointmentCard key={index} {...appointment} />
      ))}
    </ScrollView>
  );
}

export default HomeScreen;
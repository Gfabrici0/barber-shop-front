import React, { useLayoutEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon, useTheme } from '@rneui/themed';
import { styles } from './style';
import { Calendar } from 'react-native-calendars';
import AppointmentCard from '../../components/AppointmentCard';
import { DropdownMenu } from '../../components/DropdownMenu';

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

  const handleMenuItemPress = (screen: string) => {
    navigation.navigate(screen as never);
    toggleMenu();
  };

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

        <Text style={[styles.subtitle, {color: theme.theme.colors.secondary}]}>Próximos Horários</Text>
        <AppointmentCard/>
    </SafeAreaView>
  );
}



export default AppoimentScreen;
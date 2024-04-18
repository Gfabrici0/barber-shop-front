import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './styles';
import { Icon, useTheme } from '@rneui/themed';
import servicesData from "./mock/demandData.json"

export interface Appointment {
  time: string;
  clientName: string;
}

const AppointmentCard = () => {

  const theme = useTheme();
  
  return (
    <ScrollView style={styles.scrollView}>
      {
        servicesData.appoiments.map((service) => (
          <View key={service.id} style={styles.card}>
            <Text style={styles.cardTitle}>{service.hour}</Text>
            <Text style={styles.cardTitle}>{service.appoiment}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="edit" color={theme.theme.colors.edit} onPress={() => console.log('Edit Pressed')} />
              <Icon name="delete" color={theme.theme.colors.delete} onPress={() => console.log('Delete Pressed')} />
            </View>
          </View>
        ))
      }
    </ScrollView>
  );
};

export default AppointmentCard;
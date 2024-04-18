import React from 'react';
import { View, Text } from 'react-native';
import { Card, Icon } from '@rneui/base';
import { styles } from './styles';
import { useTheme } from '@rneui/themed';
import { formatTime } from '../../utils/formatTime';

export interface Appointment {
  time: string;
  clientName: string;
}

const AppointmentCard = (appointment: Appointment) => {

  const theme = useTheme();
  
  return (
    <Card containerStyle={styles.card}>
      <View style={{...styles.cardContent }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginRight: 20 }}>
            <Text style={{ fontSize: 18, color: theme.theme.colors.primary }}>{formatTime(appointment.time)}</Text>
          </View>
          <View >
            <Text style={{ fontSize: 18, color: theme.theme.colors.primary }}>{appointment.clientName}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icon name="edit" color={theme.theme.colors.edit} onPress={() => console.log('Edit Pressed')} />
          <Icon name="delete" color={theme.theme.colors.delete} onPress={() => console.log('Delete Pressed')} />
        </View>
      </View>
    </Card>
  );
};

export default AppointmentCard;
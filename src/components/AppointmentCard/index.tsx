import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './styles';
import { Icon, useTheme } from '@rneui/themed';
import servicesData from "./mock/demandData.json";
import EditScheduleModal from '../modals/EditScheduleModal';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface Appointment {
  time: string;
  clientName: string;
}

const AppointmentSection = () => {
  const [isScheduleModalVisible, setScheduleModalVisible] = useState(false);

  const handleEditOpen = () => {
    setScheduleModalVisible(true);
  };

  const handleSchedule = () => {
    toggleScheduleModal();
  };

  const toggleScheduleModal = () => {
    setScheduleModalVisible(!isScheduleModalVisible);
  };

  const theme = useTheme();

  return (
    <>
      <ScrollView style={styles.scrollView}>
        {servicesData.appoiments.map((service) => (
          <View key={service.id} style={styles.card}>
            <Text style={styles.cardTitle}>{service.hour}</Text>
            <Text style={styles.cardTitle}>{service.appoiment}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="edit" color={theme.theme.colors.edit} onPress={handleEditOpen} />
              <Icon name="delete" color={theme.theme.colors.delete} onPress={() => console.log('Delete Pressed')} />
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

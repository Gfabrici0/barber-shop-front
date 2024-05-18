import React, { useLayoutEffect, useState } from 'react';
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
import ScheduleModal from '../../modals/scheduleModal';

function Home() {

  const navigation = useNavigation();
  const theme = useTheme();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isScheduleModalVisible, setScheduleModalVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

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

  return (
    <SafeAreaView style={styles.container}>
      {isMenuVisible && (
        <DropdownMenu handleMenuItemPress={handleMenuItemPress} />
      )}
        <Text style={styles.welcomeText}>
          Bem Vindo, <Text style={{fontWeight: 'bold', color: '#632D0C'}}>{servicesData.profileName}</Text>
        </Text>
        <Text style={styles.description}>Buscar barbearia</Text>
        <View style={[styles.inputContainer, { borderColor: theme.theme.colors.secondary }]}>
          <TextInput
            style={{ color: theme.theme.colors.secondary,borderColor: theme.theme.colors.secondary }}
            placeholderTextColor={theme.theme.colors.secondary}
          />
        </View>
        <Text style={styles.description}>Resultados Encontrados:</Text>
        <ScrollView style={styles.scrollView}>
          {
            servicesData.barbershop.map((service) => (
              <View key={service.id} style={styles.card}>
                <Text style={styles.cardTitle}>{service.barbershopName}</Text>
              </View>
            ))
          }
        </ScrollView>
        <Button
          title="Agendar" 
          size="md"
          color={theme.theme.colors.secondary}
          containerStyle={styles.button}
          onPress={toggleScheduleModal}
        />
        <ScheduleModal
          visible={isScheduleModalVisible}
          onCancel={toggleScheduleModal}
          onSchedule={handleSchedule}
        />
    </SafeAreaView>
  );
}

export default Home;
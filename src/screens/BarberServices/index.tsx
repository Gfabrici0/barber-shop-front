import React, { useEffect } from 'react';
import { styles } from './style';
import { ScrollView, Text, View } from 'react-native';
import {
  Button,
  Icon
} from '@rneui/base';
import { useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import servicesData from './mock/servicesData.json';

function BarberServices() {

  const navigation = useNavigation()

  const theme = useTheme();

  
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: 'black'
      },
      headerTintColor: 'white', 
    });
  })


  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.welcomeText}>
            Bem Vindo, <Text style={{fontWeight: 'bold', color: '#632D0C'}}>{servicesData.profileName}</Text>
        </Text>
        <Text style={styles.description}>
            Esta é a sua lista de serviços {'\n'}disponibilizados para seus clientes
        </Text>
        <Text style={styles.title}>Lista de Serviços</Text>
        <ScrollView style={styles.scrollView}>
        {servicesData.cards.map((service) => (
            <View key={service.id} style={styles.card}>
                <Text style={styles.cardTitle}>{service.title}</Text>
                <Text style={styles.cardTitle}>R$ {service.value}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Icon name="edit" color={theme.theme.colors.edit} onPress={() => console.log('Edit Pressed')} />
                    <Icon name="delete" color={theme.theme.colors.delete} onPress={() => console.log('Delete Pressed')} />
                </View>
            </View>
        ))}
        </ScrollView>
        <Button
        title="Cadastrar novo serviço"
        size="md"
        color={theme.theme.colors.secondary}
        containerStyle={styles.button}
        />
    </SafeAreaView>
  );
}

export default BarberServices;
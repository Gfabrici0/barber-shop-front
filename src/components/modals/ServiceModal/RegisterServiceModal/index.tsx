import { useTheme } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Modal, TouchableOpacity, View, Text, TextInput } from "react-native";
import { styles } from "./style";
import { Icon, Button } from "@rneui/base";
import { TextInputMask } from 'react-native-masked-text';
import { barberServicesService } from "../../../../services/BarberServicesService";
import UserStore from "../../../../services/Store/UserStore";

interface ServiceModalProps {
    onClose: () => void;
    onUpdate: () => void;
}

const formatValue = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

const convertToDecimal = (value: string): number => {
    let formattedValue = value.replace('R$ ', '').trim();
    formattedValue = formattedValue.replace(/\./g, '');
    formattedValue = formattedValue.replace(',', '.');
    return parseFloat(formattedValue);
};

const RegisterServiceModal: React.FC<ServiceModalProps> = ({ onClose, onUpdate }) => {
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [barbershopId, setBarbershopId] = useState('');
    const [barberId, setBarberId] = useState('');

    const handleRegisterService = async () => {
        const decimalValue = convertToDecimal(value);

        const serviceData = {
            barbershopId: barbershopId,
            barberId: barberId,
            serviceName: serviceName,
            description: description,
            value: decimalValue,
        };

        try {
            await barberServicesService.registerService(serviceData);
            onUpdate();
            onClose();
        } catch (error) {
            console.error("Erro ao registrar o serviço:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await UserStore.getId() ?? '';
                const result = await barberServicesService.getBarberByUserId(userId);

                setBarbershopId(result.barbershop.id);
                setBarberId(result.id);
            } catch (error) {
                console.error("Erro ao buscar os detalhes do serviço:", error);
            }
        };

        fetchData();
    }, []);

    const theme = useTheme();

    return (
        <Modal transparent={true} animationType="fade" onRequestClose={onClose}>
          <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
            <View style={styles.modalContainer}>
              <View style={{ ...styles.modalHeader, backgroundColor: theme.theme.colors.primary }}>
                <Text style={{ ...styles.modalTitle, color: theme.theme.colors.white }}>
                  Detalhes do Pedido
                </Text>
                <TouchableOpacity onPress={onClose}>
                  <Icon name="close" color={"white"} />
                </TouchableOpacity>
              </View>
    
              <View style={styles.content}>
                <Text style={styles.label}>Nome do Serviço</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setServiceName}
                    placeholder="Nome do Serviço"
                />
                <Text style={styles.label}>Descrição</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setDescription}
                    placeholder="Descrição"
                />
                <Text style={styles.label}>Valor</Text>
                <TextInputMask
                    type="money"
                    options={{
                        precision: 2,
                        separator: ',',
                        delimiter: '.',
                        unit: 'R$ ',
                        suffixUnit: ''
                    }}
                    style={styles.input}
                    onChangeText={setValue}
                    placeholder="Valor"
                    keyboardType="numeric"
                />
              </View>
    
              <View style={styles.buttonContainer}>
                <Button
                    title="Cancelar"
                    buttonStyle={styles.buttonCancel}
                    titleStyle={styles.buttonCancelText}
                    onPress={() => {onClose()}}
                />
                <Button
                  title="Registrar"
                  buttonStyle={styles.buttonSchedule}
                  titleStyle={styles.buttonScheduleText}
                  /* onPress={() => {console.log("Cancelar")}}  */   
                  onPress={handleRegisterService}              
                />
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
    );
};

export default RegisterServiceModal;
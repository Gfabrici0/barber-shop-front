import { useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { Modal, TouchableOpacity, View, Text, TextInput } from "react-native";
import { styles } from "./style";
import { Icon, Button } from "@rneui/base";
import { TextInputMask } from 'react-native-masked-text';
import { barberServicesService } from "../../../../services/BarberServicesService";

interface ServiceModalProps {
    service: any;
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

const EditServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onUpdate }) => {
    const [serviceName, setServiceName] = useState(service ? service.serviceName : '');
    const [description, setDescription] = useState(service ? service.description : '');
    const [value, setValue] = useState(service ? formatValue(service.value) : '');

    interface UpdateServiceJson {
        serviceName?: string;
        description?: string;
        value?: number;
    }

    const handleUpdateService = async () => {
        try {
            const decimalValue = convertToDecimal(value);

            const updateServiceJson: UpdateServiceJson = {
                serviceName: serviceName,
                description: description,
                value: decimalValue,
            };

            await barberServicesService.updateService(updateServiceJson, service.id);
            onUpdate();
            onClose();
        } catch (error) {
            console.error("Erro ao atualizar o serviço:", error);
        }
    };

    const updateService = async (updateServiceJson: UpdateServiceJson, id: string) => {
        console.log(updateServiceJson);
        await barberServicesService.updateService(updateServiceJson, id);
    }
    
    const updateServiceJson: UpdateServiceJson = {};

    if (serviceName !== service.serviceName) {
        updateServiceJson['serviceName'] = serviceName;
    }
    
    if (description !== service.description) {
        updateServiceJson['description'] = description;
    }

    const decimalValue = convertToDecimal(value);
    if (decimalValue !== service.value) {
        updateServiceJson['value'] = decimalValue;
    }

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
                {service && (
                    <>
                        <Text style={styles.label}>Nome do Serviço</Text>
                        <TextInput
                            style={styles.input}
                            value={serviceName}
                            onChangeText={setServiceName}
                            placeholder="Nome do Serviço"
                        />
                        <Text style={styles.label}>Descrição do Serviço</Text>
                        <TextInput
                            style={styles.input}
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Descrição"
                        />
                        <Text style={styles.label}>Valor do Serviço</Text>
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
                            value={value}
                            onChangeText={setValue}
                            placeholder="Valor"
                            keyboardType="numeric"
                        />
                    </>
                )}
              </View>
    
              <View style={styles.buttonContainer}>
                <Button
                    title="Atualizar"
                    buttonStyle={styles.buttonCancel}
                    titleStyle={styles.buttonCancelText}
                    onPress={handleUpdateService}
                />
                <Button
                  title="Cancelar"
                  buttonStyle={styles.buttonSchedule}
                  titleStyle={styles.buttonScheduleText}
                  onPress={() => {onClose()}}
                />
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
    );
};

export default EditServiceModal;
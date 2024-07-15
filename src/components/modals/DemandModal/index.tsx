import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { Icon, Button } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { barberServicesService } from "../../../services/BarberServicesService";

interface DemandModalProps {
  demand: any;
  onClose: () => void;
}

const DemandModal: React.FC<DemandModalProps> = ({ demand, onClose }) => {
  const theme = useTheme();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const acceptDemand = () => {
    const updateData = {
      id: demand.id,
      status: 'BARBER_APPROVED'
    };
    barberServicesService.updateDemandStatus(updateData);
    onClose();
  };
  
  const rejectDemand = () => {
    const updateData = {
      id: demand.id,
      status: 'BARBER_REJECTED'
    };
    barberServicesService.updateDemandStatus(updateData);
    onClose();
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

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
            {demand && (
              <>
                <Text style={styles.label}>Data: {formatDate(demand.date)}</Text>
                <Text style={styles.label}>Usuário: {demand.user.username}</Text>
                <Text style={styles.label}>Idade: {calculateAge(demand.user.dateOfBirth)} anos</Text>
                <Text style={styles.label}>Serviço: {demand.service.serviceName}</Text>
                <Text style={styles.label}>Valor: R$ {demand.service.value}</Text>
              </>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Recusar"
              buttonStyle={styles.buttonCancel}
              titleStyle={styles.buttonCancelText}
              onPress={rejectDemand}
            />
            <Button
              title="Aceitar"
              buttonStyle={styles.buttonSchedule}
              titleStyle={styles.buttonScheduleText}
              onPress={acceptDemand}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default DemandModal;

import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { Picker } from "@react-native-picker/picker";
import { Icon, Button } from "@rneui/base";
import { useTheme } from "@rneui/themed";

interface ScheduleModalProps {
  visible: boolean;
  onCancel: () => void;
  onSchedule: () => void;
}

const ScheduleModal = ({
  visible,
  onCancel,
  onSchedule,
}: ScheduleModalProps) => {
  const [selectedBarber, setSelectedBarber] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const theme = useTheme();

  const barbers = [
    { id: 1, name: "Mateus Teixeira" },
    { id: 2, name: "Barbeiro B" },
    { id: 3, name: "Barbeiro C" },
  ];
  const services = [
    { id: 1, name: "Corte Americano - R$ 25,00" },
    { id: 2, name: "Corte Clássico - R$ 30,00" },
  ];

  const dates = [
    { id: 1, label: "10/05/2024", value: "2024-05-10" },
    { id: 2, label: "11/05/2024", value: "2024-05-11" },
    { id: 3, label: "12/05/2024", value: "2024-05-12" },
    { id: 4, label: "13/05/2024", value: "2024-05-13" },
  ];

  const generateHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const formattedHour = i < 10 ? `0${i}:00` : `${i}:00`;
      hours.push(formattedHour);
    }
    return hours;
  };

  const hours = generateHours();

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onCancel}>
        <View style={styles.modalContainer}>
          <View
            style={{
              ...styles.modalHeader,
              backgroundColor: theme.theme.colors.primary,
            }}
          >
            <Text
              style={{ ...styles.modalTitle, color: theme.theme.colors.white }}
            >
              Agendar Horário
            </Text>
            <TouchableOpacity onPress={onCancel}>
              <Icon name="close" color={"white"} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Barbeiro</Text>
              <View style={styles.select}>
                <Picker
                  selectedValue={selectedBarber}
                  onValueChange={(itemValue) => setSelectedBarber(itemValue)}
                  style={styles.picker}
                  mode="dropdown"
                >
                  <Picker.Item label="Selecione um barbeiro" value="" />
                  {barbers.map((barber) => (
                    <Picker.Item
                      key={barber.id}
                      label={barber.name}
                      value={barber.name}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Serviço</Text>
              <View style={styles.select}>
                <Picker
                  selectedValue={selectedService}
                  onValueChange={(itemValue) => setSelectedService(itemValue)}
                  style={styles.picker}
                  mode="dropdown"
                >
                  <Picker.Item label="Selecione um serviço" value="" />
                  {services.map((service) => (
                    <Picker.Item
                      key={service.id}
                      label={service.name}
                      value={service.name}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Data</Text>
                <View style={styles.select}>
                  <Picker
                    selectedValue={selectedDate}
                    onValueChange={(itemValue) => setSelectedDate(itemValue)}
                    style={styles.picker}
                    mode="dropdown"
                  >
                    <Picker.Item label="Selecione um dia" value="" />
                    {dates.map((day) => (
                      <Picker.Item
                        key={day.id}
                        label={day.label}
                        value={day.value}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Horário</Text>
                <View style={styles.select}>
                  <Picker
                    selectedValue={selectedTime}
                    onValueChange={(itemValue) => setSelectedTime(itemValue)}
                    style={styles.picker}
                    mode="dropdown"
                  >
                    <Picker.Item label="Selecione uma hora" value="" />
                    {hours.map((hour, index) => (
                      <Picker.Item key={index} label={hour} value={hour} />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          </View>

          {/* Cancel and Schedule Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              title="Cancelar"
              buttonStyle={styles.buttonCancel}
              titleStyle={styles.buttonCancelText}
              onPress={onCancel}
            />
            <Button
              title="Agendar"
              buttonStyle={styles.buttonSchedule}
              titleStyle={styles.buttonScheduleText}
              onPress={onSchedule}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ScheduleModal;

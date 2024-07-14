import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { styles } from "./style";
import { Icon, Button } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import RNDateTimePicker from "@react-native-community/datetimepicker";

interface ScheduleModalProps {
  visible: boolean;
  onCancel: () => void;
  onSchedule: () => void;
}

const EditScheduleModal = ({
  visible,
  onCancel,
  onSchedule,
}: ScheduleModalProps) => {
  const theme = useTheme();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDateChange = (event: any, selectedDate: any) => {
    setShowDatePicker(true);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onTimeChange = (event: any, selectedTime: any) => {
    setShowTimePicker(true);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
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
                  Editar Horário
                </Text>
                <TouchableOpacity onPress={onCancel}>
                  <Icon name="close" color={"white"} />
                </TouchableOpacity>
              </View>
              <View style={styles.content}>
                <Text style={styles.appointmentInfo}>10h Lucas Prado</Text>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Indique a nova data:</Text>
                  <TouchableOpacity
                    style={styles.inputContainer}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Icon name="calendar" type="font-awesome" color={theme.theme.colors.primary} />
                    <Text style={styles.textInput}>{date.toLocaleDateString()}</Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <RNDateTimePicker 
                      value={date}
                      mode="date"
                      display="calendar"
                      onChange={onDateChange}
                    />
                  )}
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Indique o novo horário:</Text>
                  <TouchableOpacity
                    style={styles.inputContainer}
                    onPress={() => setShowTimePicker(true)}
                  >
                    <Icon name="clock-o" type="font-awesome" color={theme.theme.colors.primary} />
                    <Text style={styles.textInput}>{time.toLocaleTimeString()}</Text>
                  </TouchableOpacity>
                  {showTimePicker && (
                    <RNDateTimePicker 
                      value={time}
                      mode="time"
                      display="clock"
                      onChange={onTimeChange}
                    />
                  )}
                </View>
              </View>
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
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EditScheduleModal;

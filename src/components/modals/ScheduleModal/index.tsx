import React, { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { styles } from "./style";
import { Picker } from "@react-native-picker/picker";
import { Icon, Button } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { appointmentService } from '../../../services/AppointmentService'
import UserStore from "../../../services/Store/UserStore";
import { Barbers, BarbersService } from "../../../services/interface/barbershop.interface";
import { barberServicesService } from "../../../services/BarberServices";
import { barbershopService } from '../../../services/BarbershopService'

interface ScheduleModalProps {
  visible: boolean;
  onCancel: () => void;
  barberShopId: string;
  barbers: Barbers[];
}

const ScheduleModal = ({
  barberShopId,
  visible,
  onCancel,
  barbers:_barbers
}: ScheduleModalProps) => {
  const [selectedBarber, setSelectedBarber] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [services, setServices] = useState<BarbersService[]>([]);

  const [availabilities, setAvailabilities] = useState<any[]>([]);
  const [barbers, setBarbers] = useState<any[]>([]);

  useEffect(() => {
    if(selectedBarber && selectedBarber.length)
      barberServicesService.getBarberServices(selectedBarber).then(
        (data) => setServices(data)
      )
  }, [selectedBarber]);

  useEffect(
    () => {
      if(selectedBarber && selectedBarber.length)
        barberServicesService.getBarberAvailabilities(selectedBarber).then(
          (data) => setAvailabilities(data)
        );
    }, [selectedBarber, setAvailabilities]
  )

  useEffect(() => {
    console.log('getting barbers')
    barbershopService.getBarbersFromBarbershop(barberShopId).then(
      (data) => {
        console.log('data', data);
        setBarbers(data.barbers)
      }
    )
  }, [setBarbers]);

  const theme = useTheme();

  const generateHours = () => {
    const hours = [];
    for (let i = 9; i <= 18; i++) {
      const formattedHour = i < 10 ? `0${i}:00` : `${i}:00`;
      hours.push(formattedHour);
    }
    return hours;
  };

  const cleanUp = () => {
    setSelectedBarber("");
    setSelectedService("");
    setSelectedDate("");
    setSelectedTime("");
  }

  const hours = (availabilities?.find(availability => availability.day == selectedDate)?.hours) ?? []

  // const hours = generateHours();

  const handleSubmit = async () => {
    const userId = await UserStore.getId() || '';
    //get date offset
    const date = new Date(new Date(selectedTime).getTime() - (new Date().getTimezoneOffset() * 60000));
    const newAppointment = {
      barberId: selectedBarber,
      barbershopId: barberShopId,
      date,
      serviceId: selectedService,
      userId,
    }

    console.log('newAppointment:', newAppointment);
    await appointmentService.createAppointment(newAppointment)
    cleanUp();
    onCancel();
  }

  console.log('barber availabilities', availabilities)


  return (
    <Modal visible={visible} transparent={true} animationType="fade">
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
                      onValueChange={(itemValue: string) => setSelectedBarber(itemValue)}
                      style={{...styles.picker, color: theme.theme.colors.primary}}
                      mode="dropdown"
                    >
                      <Picker.Item label="Selecione um barbeiro" value="" />
                      {(barbers??[]).map((barber) => (
                        <Picker.Item
                          key={barber.id}
                          label={barber.username}
                          value={barber.id}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Serviço</Text>
                  <View style={{...styles.select}}>
                    <Picker
                      selectedValue={selectedService}
                      onValueChange={(itemValue: string) => setSelectedService(itemValue)}
                      style={{...styles.picker, color: theme.theme.colors.primary}}
                      mode="dropdown"
                    >
                      <Picker.Item label="Selecione um serviço" value="" />
                      {services.map((service) => (
                        <Picker.Item
                          key={service.id}
                          label={service.serviceName}
                          style={{backgroundColor: theme.theme.colors.secondary}}
                          value={service.id}
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
                        onValueChange={(itemValue: string) => setSelectedDate(itemValue)}
                        style={{...styles.picker, color: theme.theme.colors.primary}}
                        mode="dropdown"
                      >
                        <Picker.Item label="Selecione um dia" value="" />
                        {availabilities.map((day) => (
                          <Picker.Item
                            key={day.day}
                            label={day.day}
                            value={day.day}
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
                        onValueChange={(itemValue: string) => setSelectedTime(itemValue)}
                        style={{...styles.picker, color: theme.theme.colors.primary}}
                        mode="dropdown"
                      >
                        <Picker.Item label="Selecione uma hora" value="" />
                        {hours.map((hour :any, index:number) => (
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
                  onPress={() => {
                    cleanUp();
                    onCancel();
                  }}
                />
                <Button
                  title="Agendar"
                  buttonStyle={styles.buttonSchedule}
                  titleStyle={styles.buttonScheduleText}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ScheduleModal;

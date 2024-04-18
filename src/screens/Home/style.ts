import { useTheme } from "@rneui/themed";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 30
  },
  calendarContainer: {
    marginTop: 20,
  },
  secondTitle: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    marginTop: 20,
    marginBottom: 10,
  },
})
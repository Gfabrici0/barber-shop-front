import { useTheme } from "@rneui/themed";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row', 
    alignItems: 'center',
  },
  card: { 
    borderRadius: 20,
    shadowColor: "#000",
    marginHorizontal: 0,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 20, 
  }
})
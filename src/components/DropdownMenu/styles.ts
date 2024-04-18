import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  dropdownMenu: {
    position: 'absolute',
    right: 0,
    top: 0,
    borderRadius: 5,
    padding: 10,
    elevation: 5,
    zIndex: 1000,
  },
  menuItem: {
    padding: 10,
    fontSize: 16,
    color: 'white'
  },
});
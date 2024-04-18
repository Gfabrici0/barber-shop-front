import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  cardTitle: {
    fontSize: 18,
    color: '#914111'
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
  },
})
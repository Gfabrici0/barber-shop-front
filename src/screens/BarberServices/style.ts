import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    paddingHorizontal: 30,
  },
  containerImage: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30
  },
  serviceInfo: {
    marginBottom: 4, // Ajuste conforme necessário
  },
  serviceValue: {
    marginBottom: 4, // Ajuste conforme necessário
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Isso distribui os ícones uniformemente
  },
  welcomeText: {
    color: '#914111',
    fontSize: 20,
  },
  description: {
    color: '#914111',
    marginTop: 5,
    fontSize: 15,
  },
  scrollView: {
    flex: 1
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#632D0C',
    flex: 2,
    marginRight: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
  },
  cardValue: {
    fontSize: 18,
    color: '#632D0C',
    marginRight: 10,
  },
  title: {
    color: '#914111',
    fontSize: 25,
    marginTop: 30,
    paddingBottom: 30,
  },
  button: {
    width: '100%',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 30
  },
  link: {
    color: 'white',
    textDecorationLine: 'none'
  },
  backButton: {
    marginTop: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
})
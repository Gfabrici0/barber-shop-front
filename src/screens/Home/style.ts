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
  welcomeText: {
    color: '#914111',
    fontSize: 20,
  },
  description: {
    color: '#914111',
    marginTop: 20,
    fontSize: 15,
  },
  inputContainer: {
    borderWidth: 1.3,
    borderRadius: 20,
    justifyContent: 'center',
    height: 40,
    marginBottom: 10,
    padding: 10,
  },
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
  },
  selectedCard: {
    backgroundColor: '#914111',
    color: '#fff'
  },
})
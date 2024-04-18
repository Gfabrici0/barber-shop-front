import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    paddingHorizontal: 30,
  },
  containerImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 25,
    marginBottom: 10,
    paddingBottom: 20,
  },
  button: {
    fontFamily: 'Regular Bold'
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    height: 30,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 18
  },
  link: {
    color: 'white',
    textDecorationLine: 'none'
  },
  text: {
    color: 'gray',
    marginTop: 10
  }
})
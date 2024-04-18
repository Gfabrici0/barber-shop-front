import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
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
    paddingBottom: 20,
  },
  contentContaner: {
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
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
    paddingTop: 10,
    alignSelf: 'center'
  },
})
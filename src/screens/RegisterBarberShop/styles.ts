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
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  passwordView: {    
    display: 'flex',
    flex: 1,
  },
  scrollView: {
    flex: 1,
    width: '100%',
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
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
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
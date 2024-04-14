import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    paddingHorizontal: 30,
  },
  contentContaner: {
     display: 'flex', 
     flexDirection: 'column', 
     gap: 10, 
     justifyContent: 'center', 
     alignItems: 'center' 
  },
  containerImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'gray',
  },
  link: {
    color: 'white',
    textDecorationLine: 'none'
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginBottom: 10,
    paddingBottom: 20,
  },
})
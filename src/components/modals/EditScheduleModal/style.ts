import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  appointmentInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    marginLeft: 5,
    padding: 5,
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    borderRadius: 20,
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  content: {
    width: '100%',
    padding: 20,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#8B5B35',
    borderWidth: 2,
    padding: 5,
    width: '50%',
  },
  label: {
    color: '#8B5B35',
    fontWeight: 'bold',
    marginBottom: 5,
    width: '45%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonCancel: {
    flex: 1,
    borderColor: '#8B5B35',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFF',
    paddingHorizontal: 30,
    paddingVertical: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  buttonSchedule: {
    flex: 1,
    backgroundColor: '#8B4513',
    borderRadius: 5,
    paddingHorizontal: 30,
    paddingVertical: 8,
    alignItems: 'center',
  },
  buttonCancelText: {
    fontWeight: 'bold',
    color: '#8B4513',
  },
  buttonScheduleText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
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
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',    
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    color: '#8B5B35',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  select: {
    borderRadius: 10,
    borderWidth: 1,
  },
  picker: {
    width: '100%',
    height: 50,
    backgroundColor: "#fff",
    fontWeight: 'bold',
    maxHeight: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    paddingHorizontal: 40,
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

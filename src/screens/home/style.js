import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  closeButton: {
    fontSize: 16,
    marginBottom: 30,
  },
  qrBtn: {
    marginBottom: 30,
  },
  refCode: {
    height: 50,
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#1b4074',
    color: 'black',
  },
});

export default styles;

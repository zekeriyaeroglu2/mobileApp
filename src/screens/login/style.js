import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#1b4074',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 100,
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
    color: 'black',
    fontSize: 18,
  },
  text: {
    marginTop: 10,
  },
  form: {
    alignItems: 'center',
    marginTop: 50,
  },
  email: {
    height: 50,
    width: '100%',
    margin: 6,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#1b4074',
    color: 'black',
  },
  password: {
    height: 50,
    width: '100%',
    margin: 6,
    marginBottom: 6,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#1b4074',
    color: 'black',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    color: '#fff',
    marginTop: 5,
  },
  blockText: {
    color: 'red',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;

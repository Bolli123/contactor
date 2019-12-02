import { StyleSheet } from 'react-native';
import { fadedPurple } from '../../styles/colors'

export default StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    backgroundColor: fadedPurple
  },

  button: {
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
})

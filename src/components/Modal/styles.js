import { StyleSheet, Dimensions, Keyboard } from 'react-native';

const { width: winWidth } = Dimensions.get('window')


export default StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.3,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 0.3,
    borderRadius: 5,
    width: winWidth - 75,
    backgroundColor: 'white',
    padding: 5,
  }
})

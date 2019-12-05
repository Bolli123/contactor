import { StyleSheet, Dimensions, Keyboard } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window')


export default StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 0.35,
    borderRadius: 5,
    width: winWidth - 75,
    backgroundColor: 'white',
    padding: 5,
  }
})

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  image: {
    width: 115,
    height: 115,
  },
  content: {
    flex: 3,
    justifyContent: 'center'
  },
  text: {
    marginLeft: 20,
    fontSize: 20,
  },
  checkmark: {
    position: 'absolute',
    top: 15,
    right: 15,
    fontSize: 16,
  },
  contactContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    alignContent: 'stretch',
  },
});

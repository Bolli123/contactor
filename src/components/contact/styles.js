import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  image: {
    width: 115,
    height: 115,
    borderRadius: 115 / 2,
    overflow: 'hidden',
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
    fontSize: 25,
    color: '#51CE3D'
  },
  contactContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    alignContent: 'stretch',
    borderBottomColor: '#e9e9e9',
    borderBottomWidth: 2,
    margin: 10
  },
});

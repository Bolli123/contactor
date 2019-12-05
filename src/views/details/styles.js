import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  name: {
    fontSize: 25,
    margin: 5,
  },
  phoneNumber: {
    fontSize: 25,
    color: '#6ea6ff',
    fontWeight: 'bold',
    paddingLeft: 3,
  },
  image: {
    width: 200,
    height: 200,
    margin: 15,
    borderRadius: 200 / 2,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },
  icon: {
    fontSize: 25,
    color: '#a9a9a9',
    margin: 5,
  },
  numberContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center',
  }
})

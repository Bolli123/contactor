import React from 'react';
import { Image, View, Text, TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import styles from './styles'
import { AntDesign } from '@expo/vector-icons';

const Contact = ({
  name, thumbnailPhoto, id, phoneNumber, onLongPress, isSelected, navigation: { navigate }
}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onLongPress={() => onLongPress(id)}
    onPress={() => navigate('Details', { thumbnailPhoto: thumbnailPhoto, name: name, phoneNumber: phoneNumber })}
  >
    {
      isSelected
        ?
          <AntDesign name="checkcircleo" style={ styles.checkmark } />
        :
        <>
        </>
    }
    <View style={[styles.contactContainer, { opacity: isSelected ? 0.5 : 1}]}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{ uri: thumbnailPhoto }}
      />
      <View style={styles.content}>
        <Text style={styles.text}>
          {name}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  thumbnailPhoto: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onLongPress: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default withNavigation(Contact);

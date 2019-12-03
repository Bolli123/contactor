import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Contact from '../../components/contact'

const ContactList = ({
  contacts, onLongPress, id, selectedContacts
}) => (
  <View style={{ flex: 1 }}>
    <FlatList
      numColumns={1}
      data={contacts}
      extraData={selectedContacts}
      renderItem={({ item: { name, thumbnailPhoto, id, phoneNumber } }) => {
        return (
          <Contact
            name={name}
            thumbnailPhoto={thumbnailPhoto}
            id={id}
            phoneNumber={phoneNumber}
            onLongPress={onLongPress}
            isSelected={selectedContacts.indexOf(id) !== -1}
          />
        );
      }}
      keyExtractor={(contact) => (`${contact.phoneNumber}`)}
    />
  </View>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnailPhoto: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    phoneNumber: PropTypes.string.isRequired
  })).isRequired,
  onLongPress: PropTypes.func.isRequired,
  selectedContacts: PropTypes.arrayOf(PropTypes.number).isRequired,
  id: PropTypes.number.isRequired
}

export default ContactList;

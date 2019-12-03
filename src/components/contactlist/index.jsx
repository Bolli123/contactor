import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Contact from '../../components/contact'

const ContactList = ({
  contacts, onLongPress, selectedContacts
}) => (
  <View style={{ flex: 1 }}>
    <FlatList
      numColumns={1}
      data={contacts.sort((a, b) => a.name.localeCompare(b.name))}
      extraData={selectedContacts}
      renderItem={({ item: { name, thumbnailPhoto } }) => {
        return (
          <Contact
            name={name}
            thumbnailPhoto={thumbnailPhoto}
            onLongPress={onLongPress}
            isSelected={selectedContacts.indexOf(name) !== -1}
          />
        );
      }}
      keyExtractor={(contact) => (`${contact.name}`)}
    />
  </View>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnailPhoto: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired
  })).isRequired,
  onLongPress: PropTypes.func.isRequired,
  selectedContacts: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default ContactList;

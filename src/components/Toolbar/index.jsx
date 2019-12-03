import React from 'react';
import PropTypes from 'prop-types';
import {
  View, TouchableHighlight,
  Text, SearchBar
} from 'react-native';
import styles from './styles'

const Toolbar = ({
  onAdd, onRemove, hasSelectedContacts, pagename
}) => (
  <View styleName="horizontal" style={styles.toolbar}>
    <SearchBar
      placeholder="Search"
      lightTheme
      round
      onChangeText={text => this.searchFilterFunction(text)}
      autoCorrect={false}
    />
    <TouchableHighlight onPress={onAdd} style={styles.button}>
      <Text style={styles.buttonText}>
        Add {pagename}
      </Text>
    </TouchableHighlight>
    <TouchableHighlight
      onPress={onRemove}
      style={styles.button}
      disabled={!hasSelectedContacts}
    >
      <Text style={[styles.buttonText, hasSelectedContacts ? {} : { color: 'rgba(155, 155, 155, 0.5)' }]}> Delete Selected</Text>
    </TouchableHighlight>
  </View>
)

Toolbar.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  hasSelectedContacts: PropTypes.bool.isRequired,
  pagename: PropTypes.string.isRequired
}

export default Toolbar;

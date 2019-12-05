import React, { Component } from 'react';
import { TextInput, View } from 'react-native';

export default class InputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  componentDidMount() {
    this.setState({ text: this.props.defaultValue })
  }

  onChange(text) {
    this.setState({ text })
    this.props.userInput(text)
  }

  render() {
    return (
      <View>
        <TextInput
          style={{ height: 40, width: 150, textAlign: 'center' }}
          onChangeText={(text) => this.onChange(text)}
          placeholder={this.props.placeholder}
          value={ this.state.text }
          editable={ this.props.editable }
          selectTextOnFocus={ this.props.editable }
        />
      </View>
    );
  }
}

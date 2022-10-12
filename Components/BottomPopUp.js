import React, {useEffect} from 'react';
import {
  Modal,
  Dimension,
  TouchableWithoutFeedback,
  ext,
  View,
  StyleSheet,
} from 'react-native';

export class BottomPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  show = () => {
    this.setState({show: true});
  };
  close = () => {
    this.setState({show: false});
  };
  renderOutsideTouchable(onTouch) {
    const view = <View styles={{flex: 1, width: '100%'}} />;
    if (!onTouch) return view;
    return <TouchableWithoutFeedback></TouchableWithoutFeedback>;
  }

  render() {
    let {show} = this.state;
    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={show}
        onRequestClose={this.Close}>
        <View
          styles={{
            flex: 1,
            backgroundColor: '#00000AA',
            justifyContent: 'flex-end',
          }}>
          {this.renderOutsideTouchable(onTouchOutside)}
        </View>
      </Modal>
    );
  }
}

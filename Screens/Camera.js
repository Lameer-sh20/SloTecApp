// import React in our code
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

class CameraPage extends Component {
  //define params
  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        //flashMode: RNCamera.Constants.FlashMode.auto,
      },
    };
  }

  async onBarCodeRead(scanResult) {
    //console.warn(scanResult.type);
    //console.warn(scanResult.data);
    if (
      scanResult.data != null &&
      !this.barcodeCodes.includes(scanResult.data)
    ) {
      this.barcodeCodes.push(scanResult.data);
      //console.warn('onBarCodeRead call');
      //console.log('lenght is', this.barcodeCodes.length);
      if (this.barcodeCodes.length === 1) {
        //console.log('saved');
        //log('barcode is', scanResult.data);
        AsyncStorage.setItem('Barcode', scanResult.data);
        this.barcodeCodes = [];
        this.props.navigation.navigate('ScannedProductPage');
      }
    }
    return;
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          defaultTouchToFocus
          //flashMode={this.state.camera.flashMode}
          //mirrorImage={false}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          //onFocusChanged={() => {}}
          //onZoomChanged={() => {}}
          style={styles.preview}
          type={this.state.camera.type}
        />
        <View style={[styles.overlay, styles.topOverlay]} />
      </View>
    );
  }
}

export default CameraPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

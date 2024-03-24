import React from 'react';
import { splash } from '../assets';
import { ImageBackground, StyleSheet, View } from 'react-native';

const Splash = () => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={splash} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});

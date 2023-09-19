import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { splash } from '../assets';

const Splash = () => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground style={{flex: 1}} source={splash} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});

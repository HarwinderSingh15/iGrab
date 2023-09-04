import React from 'react';
import InstagramLikeGradient from './InstagramGradient';

import { arrow } from '../assets';
import { FONTS } from '../theme/Fonts';
import { ms } from 'react-native-size-matters';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../theme/Colors';

const Header = () => {
  return (
    <InstagramLikeGradient style={styles.cnt}>
      <TouchableOpacity style={styles.icon}>
        <Image
          style={[styles.icon, { tintColor: COLORS.white }]}
          source={arrow}
        />
      </TouchableOpacity>
      <Text style={styles.headText}>iGrab</Text>
      <View style={styles.icon} />
    </InstagramLikeGradient>
  );
};

export default Header;

const styles = StyleSheet.create({
  headText: {
    fontSize: ms(18),
    color: COLORS.white,
    fontFamily: FONTS.NunitoBold,
  },
  cnt: {
    height: ms(55),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: ms(15),
    justifyContent: 'space-between',
  },
  icon: { width: ms(20), height: ms(20), transform: [{ rotate: '90deg' }] },
});

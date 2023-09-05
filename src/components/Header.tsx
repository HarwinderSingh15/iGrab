import React, { useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import { ms } from 'react-native-size-matters';

import { FONTS } from '../theme/Fonts';
import { COLORS } from '../theme/Colors';
import { name as appName } from '../../app.json';
import InstagramLikeGradient from './InstagramGradient';
import { goBack } from '../navigators/navigationRef';

interface Props {
  icon?: ImageSourcePropType;
  title?: string;
}

const Header = ({ icon, title }: Props) => {
  const emptyView = useCallback(() => <View style={styles.icon} />, []);

  return (
    <InstagramLikeGradient style={styles.cnt}>
      <TouchableOpacity
        disabled={!icon}
        onPress={() => goBack()}
        style={styles.icon}>
        {!!icon ? (
          <Image
            style={[styles.icon, { tintColor: COLORS.white }]}
            source={icon}
          />
        ) : (
          emptyView()
        )}
      </TouchableOpacity>
      <Text style={styles.headText}>{title || appName}</Text>
      {emptyView()}
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

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
  title?: string;
  onRightPress?: () => void;
  icon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
}

const Header = ({ icon, title, rightIcon, onRightPress }: Props) => {
  const emptyView = useCallback(() => <View style={styles.icon} />, []);

  return (
    <InstagramLikeGradient style={styles.cnt}>
      <TouchableOpacity
        disabled={!icon}
        onPress={() => goBack()}
        style={styles.icon}>
        {!!icon ? <Image style={styles.icon} source={icon} /> : emptyView()}
      </TouchableOpacity>
      <Text style={styles.headText}>{title || appName}</Text>
      <TouchableOpacity
        disabled={!rightIcon}
        onPress={onRightPress}
        style={styles.icon}>
        {!!rightIcon ? (
          <Image
            style={[styles.icon, { transform: [{ rotate: '270deg' }], width: ms(25), height: ms(25)}]}
            source={rightIcon}
          />
        ) : (
          emptyView()
        )}
      </TouchableOpacity>
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
  icon: {
    width: ms(20),
    height: ms(20),
    tintColor: COLORS.white,
    transform: [{ rotate: '90deg' }],
  },
});

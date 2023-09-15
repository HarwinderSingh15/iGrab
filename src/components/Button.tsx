import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageProps,
  TouchableOpacity,
  ImageStyle,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { FONTS } from '../theme/Fonts';
import { COLORS } from '../theme/Colors';
import { ms } from 'react-native-size-matters';

interface Props {
  title: string;
  icon: ImageProps;
  txtStyle?: TextStyle;
  iconStyles?: ImageStyle;
  txtCntStyle?: ViewStyle;
  handlePasteUrl: () => void;
}

const CustomBtn = ({
  icon,
  title,
  txtStyle,
  iconStyles,
  txtCntStyle,
  handlePasteUrl,
  ...rest
}: Props) => {
  return (
    <View style={styles.cnt}>
      <Image style={[styles.icon, iconStyles]} source={icon} />
      <TouchableOpacity
        {...rest}
        activeOpacity={0.8}
        onPress={handlePasteUrl}
        style={[styles.txtCnt, txtCntStyle]}>
        <Text style={[styles.txt, txtStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  cnt: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: ms(20),
  },

  icon: { width: ms(40), height: ms(40), borderRadius: ms(50) },

  txt: {
    marginLeft: ms(35),
    color: COLORS.white,
    fontFamily: FONTS.NunitoSemiBold,
  },

  txtCnt: {
    zIndex: -1,
    left: ms(-20),
    width: ms(120),
    height: ms(38),
    justifyContent: 'center',
    borderTopRightRadius: ms(25),
    backgroundColor: COLORS.instaReddish,
  },
});

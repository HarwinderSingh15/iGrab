import React from 'react';
import {
  Text,
  View,
  Image,
  ViewStyle,
  TextStyle,
  StyleSheet,
  ImageProps,
  ImageStyle,
  TouchableOpacity,
} from 'react-native';

import { FONTS } from '../theme/Fonts';
import { COLORS } from '../theme/Colors';
import { ms } from 'react-native-size-matters';
import Animated, {
  Easing,
  withSpring,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface Props {
  title: string;
  icon: ImageProps;
  isLoading?: boolean;
  txtStyle?: TextStyle;
  iconStyles?: ImageStyle;
  txtCntStyle?: ViewStyle;
  onPress: () => void;
}

const CustomBtn = ({
  icon,
  title,
  onPress,
  txtStyle,
  isLoading,
  iconStyles,
  txtCntStyle,
  ...rest
}: Props) => {
  const animationValue = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animationValue.value }],
    };
  });

  const handlePressIn = () => {
    animationValue.value = withTiming(0.95, {
      duration: 100,
      easing: Easing.ease,
    });
  };

  const handlePressOut = () => {
    animationValue.value = withSpring(1);
    onPress();
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        {...rest}
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.cnt, { opacity: isLoading ? 0.5 : 1 }]}>
        <Image style={[styles.icon, iconStyles]} source={icon} />
        <View style={[styles.txtCnt, txtCntStyle]}>
          <Text style={[styles.txt, txtStyle]}>{title}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  cnt: {
    left: ms(10),
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: ms(20),
    justifyContent: 'center',
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

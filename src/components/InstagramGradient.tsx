import React, { FC, ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../theme/Colors';

interface Props {
  children: ReactNode;
  style: ViewStyle;
}

const InstagramLikeGradient: FC<Props> = ({ children, style }) => {
  return (
    <LinearGradient
      colors={[COLORS.instaReddish, COLORS.instaPinkkish]}
      style={style}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      {children}
    </LinearGradient>
  );
};

export default InstagramLikeGradient;

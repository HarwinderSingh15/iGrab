import React, { FC, ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  children: ReactNode;
  style: ViewStyle;
}

const InstagramLikeGradient: FC<Props> = ({ children, style }) => {
  return (
    <LinearGradient
      colors={['#FF495C', '#FF007D']}
      style={style}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      {children}
    </LinearGradient>
  );
};

export default InstagramLikeGradient;

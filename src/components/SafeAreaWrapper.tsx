import React, { FC, ReactNode } from 'react';

import { COLORS } from '../theme/Colors';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  children: ReactNode;
  style?: ViewStyle;
}

const SafeAreaWrapper: FC<Props> = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};

export default SafeAreaWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBlack,
  },
});

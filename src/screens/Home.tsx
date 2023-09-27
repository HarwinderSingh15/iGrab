import React, { useCallback } from 'react';
import { ms } from 'react-native-size-matters';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from '../components/Header';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

import { FONTS } from '../theme/Fonts';
import { COLORS } from '../theme/Colors';
import { NAVIGATION } from '../constants/Navigation';
import { navigate } from '../navigators/navigationRef';
import { homeBanner, reelsDownloading } from '../assets';

const Home = () => {
  const handleOnPress = useCallback(() => {
    navigate(NAVIGATION.ReelsDownloader);
  }, []);

  const openPrivacyLink = () => {
    Linking.openURL('https://igrab-tdh.web.app/');
  };

  return (
    <SafeAreaWrapper>
      <Header />

      <View style={styles.adCnt}>
        <Image style={styles.adImg} source={homeBanner} />
      </View>

      <TouchableOpacity
        onPress={handleOnPress}
        activeOpacity={0.5}
        style={styles.itemsCnt}>
        <Image style={styles.itemsImg} source={reelsDownloading} />

        <Text style={styles.itemsName}>Reels Downloader</Text>
      </TouchableOpacity>

      <View style={{ flex: 0.5 }} />

      <TouchableOpacity onPress={() => {}} style={styles.footer}>
        <Text style={styles.privacyPolicyText}>Privacy Policy</Text>
      </TouchableOpacity>
    </SafeAreaWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  footer: { alignSelf: 'center', marginBottom: ms(20) },

  privacyPolicyText: {
    color: COLORS.white,
    fontFamily: FONTS.NunitoRegular,
    textDecorationLine: 'underline',
  },

  itemsName: {
    fontSize: ms(16),
    marginTop: ms(10),
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: FONTS.NunitoMedium,
  },

  itemsImg: { width: ms(80), height: ms(80) },

  itemsCnt: {
    width: ms(150),
    height: ms(180),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: ms(12),
    paddingVertical: ms(20),
    justifyContent: 'center',
    paddingHorizontal: ms(12),
    backgroundColor: COLORS.containerBlack,
  },

  adImg: { resizeMode: 'contain', height: ms(200), width: ms(200) },

  adCnt: { flex: 0.5, alignSelf: 'center' },
});

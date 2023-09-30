import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';

import { FONTS } from '../theme/Fonts';
import { COLORS } from '../theme/Colors';
import { arrow, go, paste } from '../assets';
import { NAVIGATION } from '../constants/Navigation';
import { navigate } from '../navigators/navigationRef';
import Header from '../components/Header';
import CustomBtn from '../components/Button';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

const ReelsDownloader = () => {
  const [uri, setUri] = useState('');

  const isFocused = useIsFocused();

  const handlePasteUrl = useCallback(async () => {
    const copiedUri = await Clipboard.getString();
    setUri(prev => copiedUri);
  }, []);

  const goToPreview = useCallback(() => {
    if (!!uri) {
      navigate(NAVIGATION.Preview, { uri });
    } else {
      alert('Please enter link to proceed.');
    }
  }, [uri]);

  useEffect(() => {
    if (isFocused) {
      setUri('');
    }
  }, [isFocused]);

  return (
    <SafeAreaWrapper>
      <Header title="Reels Downloader" icon={arrow} />
      <View>
        <TextInput
          value={uri}
          inputMode="url"
          onChangeText={setUri}
          style={styles.txtInput}
          clearButtonMode="always"
          cursorColor={COLORS.instaReddish}
          placeholder="Download posts from Instagram or Facebook"
        />
      </View>

      <View style={styles.btnCnt}>
        <CustomBtn
          icon={paste}
          title="Paste"
          onPress={handlePasteUrl}
          txtCntStyle={styles.whiteBg}
          txtStyle={{ color: COLORS.instaPinkkish }}
        />

        <TouchableOpacity onPress={goToPreview} style={styles.previewBtn}>
          <Image style={styles.previewIcon} source={go} />
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
};

export default ReelsDownloader;

const styles = StyleSheet.create({
  previewIcon: { width: ms(40), height: ms(40), borderRadius: ms(50) },

  previewBtn: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  pasteTxt: {
    marginLeft: ms(35),
    color: COLORS.instaPinkkish,
    fontFamily: FONTS.NunitoSemiBold,
  },

  pasteTxtCnt: {
    zIndex: -1,
    left: ms(-20),
    width: ms(90),
    height: ms(38),
    justifyContent: 'center',
    borderTopRightRadius: ms(25),
    backgroundColor: COLORS.white,
  },

  pasteIcon: { width: ms(40), height: ms(40), borderRadius: ms(50) },

  pasteBtn: {
    marginTop: ms(30),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  btnCnt: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  txtInput: {
    width: '80%',
    height: ms(46),
    marginTop: ms(60),
    borderWidth: ms(1),
    alignSelf: 'center',
    paddingHorizontal: ms(20),
    borderTopLeftRadius: ms(25),
    borderTopRightRadius: ms(25),
    backgroundColor: COLORS.white,
    fontFamily: FONTS.NunitoMedium,
    borderColor: COLORS.instaPinkkish,
  },

  whiteBg: {
    backgroundColor: COLORS.white,
  },
});

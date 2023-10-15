import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  TestIds,
  AdEventType,
  InterstitialAd,
} from 'react-native-google-mobile-ads';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import {
  displayNormalNotification,
  displayProgressNotification,
} from '../utils/notificationsByNotifee';
import WebView from 'react-native-webview';
import Toast from 'react-native-root-toast';
import RNBlobUtil from 'react-native-blob-util';
import analytics from '@react-native-firebase/analytics';

import { COLORS } from '../theme/Colors';
import { ms } from 'react-native-size-matters';
import { goBack } from '../navigators/navigationRef';
import { BANNER_ADD_ID } from '../constants/constants';
import { arrow, close, download, newUrl } from '../assets';
import { inferContentTypeFromUrl } from '../utils/globalMethods';
import Header from '../components/Header';
import CustomBtn from '../components/Button';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { FONTS } from '../theme/Fonts';

const TOAST_CONFIG = {
  opacity: 0.9,
  position: Toast.positions.BOTTOM,
  containerStyle: {
    width: ms(280),
    height: ms(40),
    backgroundColor: COLORS.appBlack,
  },
};

const Preview = ({ route }) => {
  const uri = route?.params?.uri;

  const [postUrl, setPostUrl] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const wvRef = useRef(null);

  const { height, width } = useWindowDimensions();

  const handleWebViewMsg = (e: any) => {
    if (e?.nativeEvent) {
      const link = e?.nativeEvent?.data;
      setPostUrl(link);
    }
  };

  const onDone = (msg?: string) => {
    setPostUrl('');
    setDownloading(false);
  };

  const interstitial = InterstitialAd.createForAdRequest(
    __DEV__ ? TestIds.INTERSTITIAL : BANNER_ADD_ID,
    {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing', 'sport', 'social'],
    },
  );

  const onNavigationStateChange = navState => {
    const { url } = navState;

    // Define regular expressions for Instagram, YouTube, and Facebook URLs
    const instagramRegex = /https:\/\/(www\.)?instagram\.com/;
    // const youtubeRegex = /https:\/\/(www\.)?youtube\.com/;
    const facebookRegex = /https:\/\/(www\.)?facebook\.com/;

    // Check if the URL matches any of the allowed domains
    if (
      instagramRegex.test(url) ||
      // youtubeRegex.test(url) ||
      facebookRegex.test(url)
    ) {
      return;
    } else {
      wvRef.current &&
        wvRef.current.injectJavaScript(
          'document.documentElement.innerHTML = "";',
        );

      setNotFound(true);
      // Show an error message when the URL is not supported
      Toast.show('This link is not supported', TOAST_CONFIG);
    }
  };

  const handleNewUrl = () => {
    onDone();
    goBack();
  };

  const downloadPost = useCallback(() => {
    analytics().logEvent('download_started');
    setDownloading(true);
    Toast.show('Downloading started', TOAST_CONFIG);

    const date = new Date();
    displayNormalNotification('iGrab-post-1', 'Downloading started');

    const downloadDir = `${RNBlobUtil.fs.dirs.LegacyDownloadDir}/iGrab`;

    const downloadPath = `${downloadDir}/${Math.floor(
      date.getTime() + date.getSeconds() / 2,
    )}${inferContentTypeFromUrl(postUrl)}`;

    // Use react-native-blob-util to start the download
    RNBlobUtil.config({
      addAndroidDownloads: {
        path: downloadPath,
        useDownloadManager: true,
      },
    })
      .fetch('GET', postUrl)
      .progress((received, total) => {
        let percentage = (received / total) * 100;
        displayProgressNotification(
          'iGrab-post-1',
          'Downloading',
          100,
          percentage,
        );
      })
      .then(res => {
        displayNormalNotification('iGrab-post-1', 'Download is successful');
        setDownloading(false);
        Toast.show('Downloading complete', TOAST_CONFIG);
      })
      .catch(err => {
        displayNormalNotification(
          'iGrab-post-1',
          'Download is not successful! Please try again',
        );
        setDownloading(false);
      });
  }, [postUrl]);

  const INJECTED_JS = `
      (function() {
        setTimeout(() => {
          document.body.style.color= "#333636"
          if (document.querySelectorAll("video").length > 0) {
            window.ReactNativeWebView.postMessage(document.querySelectorAll("video")[0].src);
          } else if (document.querySelectorAll('img').length > 0) {
            const imgs = document.querySelectorAll('img');
            const jsImgs = Array.prototype.slice.call(imgs);
            const imgLink = jsImgs.filter(el => el.srcset).map(el => el.srcset)[0].split(',')[2].split(' ')[0];
            window.ReactNativeWebView.postMessage(imgLink);
          }
        }, 5000)
      })();
    `;

  useEffect(() => {
    interstitial.load();
    interstitial.addAdEventListener(AdEventType.LOADED, () => {
      if (downloading) {
        interstitial.show();
      }
    });
  }, [downloading]);

  return (
    <SafeAreaWrapper>
      {!postUrl && !notFound && (
        <View style={styles.loaderCnt}>
          <ActivityIndicator size="large" color={COLORS.instaPinkkish} />
        </View>
      )}

      <Header
        icon={arrow}
        title="Preview"
        rightIcon={close}
        onRightPress={handleNewUrl}
      />

      {!notFound ? (
        <WebView
          ref={wvRef}
          source={{ uri }}
          onMessage={handleWebViewMsg}
          injectedJavaScript={INJECTED_JS}
          onNavigationStateChange={onNavigationStateChange}
          style={{
            height,
            width,
            backgroundColor: COLORS.appBlack,
          }}
        />
      ) : (
        <View style={styles.notSupportedText}>
          <Text style={styles.notSupportedTxt}>This url is not supported.</Text>
        </View>
      )}

      <View style={styles.btnCnt}>
        <CustomBtn
          title="Download"
          icon={download}
          onPress={downloadPost}
          isLoading={downloading || !postUrl}
          iconStyles={{ backgroundColor: COLORS.instaReddish }}
        />
        <CustomBtn
          title="New url"
          icon={newUrl}
          onPress={handleNewUrl}
          iconStyles={styles.whiteBg}
          txtCntStyle={styles.whiteBg}
          txtStyle={{ color: COLORS.instaReddish }}
        />
      </View>
    </SafeAreaWrapper>
  );
};

export default Preview;

const styles = StyleSheet.create({
  notSupportedText: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notSupportedTxt: {
    color: COLORS.white,
    fontSize: ms(14, 0.3),
    fontFamily: FONTS.NunitoSemiBold,
  },
  btnCnt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loaderCnt: {
    zIndex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0,0,0.5)',
  },
  whiteBg: { backgroundColor: COLORS.white },

  btnTxt: { fontSize: ms(16), color: 'white' },
});

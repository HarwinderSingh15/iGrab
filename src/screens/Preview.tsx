import React, { useCallback, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Alert,
} from 'react-native';
import {
  displayNormalNotification,
  displayProgressNotification,
} from '../utils/notificationsByNotifee';
import RNFetchBlob from 'rn-fetch-blob';
import WebView from 'react-native-webview';

import { COLORS } from '../theme/Colors';
import { arrow, close, download, newUrl } from '../assets';
import { ms } from 'react-native-size-matters';
import { goBack } from '../navigators/navigationRef';
import { inferContentTypeFromUrl } from '../utils/globalMethods';
import Header from '../components/Header';
import CustomBtn from '../components/Button';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

const Preview = ({ route }) => {
  const uri = route?.params?.uri;

  const [postUrl, setPostUrl] = useState('');
  const [downloading, setDownloading] = useState(false);

  const { height, width } = useWindowDimensions();

  const handleWebViewMsg = (e: any) => {
    if (e?.nativeEvent) {
      const link = e?.nativeEvent?.data;
      setPostUrl(link);
    }
  };

  const onDone = useCallback((msg?: string) => {
    setPostUrl('');
    setDownloading(false);
  }, []);

  const handleNewUrl = useCallback(() => {
    onDone();
    goBack();
  }, []);

  const downloadPost = useCallback(() => {
    setDownloading(true);
    const date = new Date();
    displayNormalNotification('iGrab-post-1', 'Downloading started');
    let downloadDir = RNFetchBlob.fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: false,
        path:
          downloadDir +
          '/iGrab/' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          inferContentTypeFromUrl(postUrl),
        description: 'Downloading your post',
      },
    };

    // Configure the download with RNFetchBlob
    RNFetchBlob.config(options)
      .fetch('GET', postUrl)
      .progress((received, total) => {
        let percentage = (received / total) * 100;
        console.log(percentage);
        displayProgressNotification(
          'iGrab-post-1',
          'Downloading',
          100,
          percentage,
        );
      })
      .then(() => {
        displayNormalNotification('iGrab-post-1', 'Download is successfull');
        setDownloading(false);
      })
      .catch(err => {
        displayNormalNotification(
          'iGrab-post-1',
          'Download is unsuccessfull! please try again',
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

  return (
    <SafeAreaWrapper>
      <Header
        icon={arrow}
        title="Preview"
        rightIcon={close}
        onRightPress={handleNewUrl}
      />
      <WebView
        source={{ uri }}
        onMessage={handleWebViewMsg}
        injectedJavaScript={INJECTED_JS}
        style={{
          height,
          width,
          backgroundColor: COLORS.appBlack,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
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
  whiteBg: { backgroundColor: COLORS.white },
  btnTxt: { fontSize: ms(16), color: 'white' },
});

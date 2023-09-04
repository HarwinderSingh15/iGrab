import React, { useCallback, useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';

import { ms } from 'react-native-size-matters';
import { inferContentTypeFromUrl } from './utils/globalMethods';

import RNFetchBlob from 'rn-fetch-blob';
import WebView from 'react-native-webview';
import SafeAreaWrapper from './components/SafeAreaWrapper';
import Header from './components/Header';

const App = () => {
  const [uri, setUri] = useState('');
  const [postUrl, setPostUrl] = useState('');
  const [downloading, setDownloading] = useState(false);

  const { height, width } = useWindowDimensions();

  const handleWebViewMsg = e => {
    if (e?.nativeEvent) {
      const link = e?.nativeEvent?.data;
      setPostUrl(link);
    }
  };

  const onDone = useCallback(msg => {
    msg && alert(msg);
    setUri('');
    setPostUrl('');
    setDownloading(false);
  }, []);

  const handleNewUrl = useCallback(() => {
    onDone();
  }, []);

  const downloadPost = useCallback(() => {
    setDownloading(true);
    const date = new Date();
    let downloadDir = RNFetchBlob.fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
        notification: false,
        path:
          downloadDir +
          '/me_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          inferContentTypeFromUrl(postUrl), // this is the path where your downloaded file will live in
        description: 'Downloading your post',
      },
    };

    RNFetchBlob.config(options)
      .fetch('GET', postUrl)
      .then(() => {
        alert('Your post has been downloaded succesfully');
        setDownloading(false);
      })
      .catch(err => {
        alert('Unable to download from link, Try again!');
        setDownloading(false);
      });
  }, [postUrl]);

  const INJECTED_JS = `
    (function() {
      setTimeout(() => {
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
    <SafeAreaWrapper style={styles.safeAreaView}>
      <Header />
      {!uri ? (
        <>
          <TextInput
            value={uri}
            inputMode="url"
            onChangeText={setUri}
            style={styles.txtInput}
            placeholder="paste url here"
          />
        </>
      ) : (
        <>
          <WebView
            source={{ uri }}
            onMessage={handleWebViewMsg}
            injectedJavaScript={INJECTED_JS}
            style={{
              height,
              width,
            }}
          />
          <TouchableOpacity
            disabled={!postUrl}
            onPress={downloadPost}
            style={[styles.btn('#3a86ff'), { opacity: !postUrl ? 0.5 : 1 }]}>
            {downloading ? (
              <ActivityIndicator color={'white'} />
            ) : (
              <Text style={styles.btnTxt}>Download post</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNewUrl}
            style={styles.btn('#fb5607')}>
            <Text style={styles.btnTxt}>New url</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaWrapper>
  );
};

export default App;

const styles = StyleSheet.create({
  safeAreaView: {},
  txtInput: {
    width: '90%',
    borderRadius: ms(8),
    borderWidth: ms(1),
    borderColor: 'gray',
    paddingHorizontal: ms(10),
  },
  btn: color => ({
    height: ms(40),
    backgroundColor: color,
    width: '70%',
    marginVertical: ms(10),
    borderRadius: ms(8),
    justifyContent: 'center',
    alignItems: 'center',
  }),
  btnTxt: { fontSize: ms(16), color: 'white' },
});

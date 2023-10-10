import React from 'react';
import { GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

import { BANNER_ADD_ID } from '../constants/constants';

const CustomAds = () => {
  return (
    <GAMBannerAd
      unitId={BANNER_ADD_ID}
      sizes={[BannerAdSize.FULL_BANNER]}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
};

export default CustomAds;

function onDeviceReady() {
      document.removeEventListener('deviceready', onDeviceReady, false);
      
      // Set AdMobAds options:
      admob.setOptions({
	        publisherId:          "ca-app-pub-6148469939073110~7222787278",  // Required
	        interstitialAdId:     "ca-app-pub-6148469939073110/2352113288",  // Optional
	        tappxIdiOS:           "/XXXXXXXXX/Pub-XXXX-iOS-IIII",            // Optional
	        tappxIdAndroid:       "/XXXXXXXXX/Pub-XXXX-Android-AAAA",        // Optional
	        tappxShare:           0.5  ,                                      // Optional
			  adSize:               admob.AD_SIZE.SMART_BANNER,
			  bannerAtTop:          true,
			  overlap:              true,
			  offsetStatusBar:      false,
			  isTesting:            true,
			  adExtras :            {},
			  autoShowBanner:       true,
			  autoShowInterstitial: true
      });
      
      // Start showing banners (atomatic when autoShowBanner is set to true)
      //admob.createBannerView();
      
      // Request interstitial (will present automatically when autoShowInterstitial is set to true)
      //

      window.ga.startTrackerWithId('UA-101284964-1', 30);
    }
    
    document.addEventListener("deviceready", onDeviceReady, false);
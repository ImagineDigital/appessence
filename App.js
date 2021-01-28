/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  // SafeAreaView,
  StyleSheet,
  // ScrollView,
  // View,
  // Text,
  StatusBar,
  ActivityIndicator,
  BackHandler
} from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

import { WebView} from 'react-native-webview';
import { useEffect, useRef, useState } from 'react';
import OneSignal from 'react-native-onesignal';

const Loading = () => <ActivityIndicator
  color="#7095ab"
  size="large"
  style={[styles.loading]}

/>

const App: () => React$Node = () => {

  const urlSite = "https://www.essence.imcdigital.com.br/inicio.html";

  const webviewref = useRef(null);
  const [canGoBack,setCanGoBack] = useState(false);
  const [canGoForward,setCanForward] = useState(false);
  const [currentUrl,setCurrentUrl] = useState(urlSite);

  const backAction = ()=>{

    if(canGoBack){
      webviewref.current.goBack();
    }else{
      // navegation.goBack();
    }
    return true;
  }

  useEffect(()=>{
    OneSignal.setAppId("28a31b80-89e7-4b06-a64c-e6cf7416d2b8");
  },[]);

  useEffect(()=>{
    BackHandler.addEventListener("hardwareBackPress", backAction);
    () => BackHandler.removeEventListener("hardwareBackPress", backAction);
  },[canGoBack])

  

  return (
    <>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="#f1af7b" 
        hidden={false}
      />
      <WebView
        ref={webviewref}
        source={{uri:currentUrl}}
        startInLoadingState = {true}
        renderLoading = {Loading}
        onNavigationStateChange={ navState =>{
          setCanGoBack(navState.canGoBack);
          setCanForward(navState.canGoForward);
          setCurrentUrl(navState.url);
        }
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  loading:{
    position:'absolute',
    width:'100%',
    height:'100%',
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
});

export default App;

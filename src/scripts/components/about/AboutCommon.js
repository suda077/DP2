/*
 * This example demonstrates how to use ParallaxScrollView within a ScrollView component.
 */
import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ListView,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar
} from 'react-native';
import ViewUtils from '../../utils/ViewUtils';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import styles from '../../../styles/about/aboutStyle';


export const FLAG_ABOUT = {flag_about: 'about',flag_about_author:'about_author'}

const window = Dimensions.get('window');
const PARALLAX_HEADER_HEIGHT = 300;
const STICKY_HEADER_HEIGHT = 50;//顶部条高度

export default class AboutCommon {
  constructor(props,updateState,flag_about) {
    this.props = props;
    this.updateState = updateState;
    this.flag_about = flag_about;
  }

  getParallaxRenderConfig(params){
    let config = {};
    //背景
    config.renderBackground = () => (
              <View key="background">
                <Image style={{width: window.width,height: PARALLAX_HEADER_HEIGHT}} source={require('../../../images/my/bg.png')}/>
                <View style={styles.renderBackground}/>
              </View>
            );
    //前景
    config.renderForeground = () => (
              <View key="parallax-header" style={ styles.parallaxHeader }>
                <Image style={styles.avatar} source={require('../../../images/my/my.jpg')}/>
                <Text style={ styles.sectionSpeakerText }>
                  {params.name}
                </Text>
                <Text style={ styles.sectionTitleText }>
                  {params.description}
                </Text>
              </View>
            );
    //标题
    config.renderStickyHeader = () => (
              <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{params.name}</Text>
              </View>
            );
    //页头
    config.renderFixedHeader = () => (
              <View key="fixed-header" style={styles.fixedSection}>
                {ViewUtils.leftBackButton(()=>this.props.navigation.goBack())}
              </View>
            );
    return config;
  }


  renderView(params,content) {
    let renderConfig = this.getParallaxRenderConfig(params)
    return (  
        <ParallaxScrollView
          headerBackgroundColor="#333"
          backgroundColor={'#000'}
          stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
          parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
          backgroundSpeed={10}
          {...renderConfig}>

        <StatusBar backgroundColor={'#000'} networkActivityIndicatorVisible={true}/> 

        {content}
        
        </ParallaxScrollView> 
    );
  }

}


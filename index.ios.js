/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import PlayerView from './app/components/PlayerView';
import VideoListView from './app/components/VideoListView';

export default class DrumSchool extends Component {
  renderScene(route, navigator) {
    switch (route.name) {
      case 'list':
        return (
          <VideoListView
            navigator={navigator}
            playlistID="PL2CdKpduF6P_IzKM3J7cBgsi634wmeUTm"
          />
        );
      case 'player':
        return (
          <PlayerView
            navigator={navigator}
            videoID={route.videoID}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{ name: 'list' }}
        renderScene={this.renderScene}
        style={styles.navigator}
      />
    );
  }
}

const styles = StyleSheet.create({
  navigator: {
    backgroundColor: 'white',
    flex: 1,
  },
});

AppRegistry.registerComponent('DrumSchool', () => DrumSchool);

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import YouTube from 'react-native-youtube';

export default class PlayerView extends Component {
  render() {
    return (
      <View>
        <YouTube
          hidden={false}
          play={true}
          playsInline={true}
          style={{
            alignSelf: 'stretch',
            backgroundColor: 'black',
            height: '100%',
            marginVertical: 10,
          }}
          videoId={this.props.videoID}
        />
        <TouchableOpacity
          onPress={this.props.navigator.pop}>
          <Text style={{ color: '#40b2bf' }}>
            Close this video
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

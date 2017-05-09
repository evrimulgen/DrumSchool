import React, { Component } from 'react';
import { DOMParser } from 'xmldom';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class VideoListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
    };
  }

  componentDidMount() {
    this.fetchVideos();
  }

  fetchVideos() {
    const { playlistID } = this.props;
    const url = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistID}`;
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        this.parseVideos(responseText);
      })
      .catch((error) => {
        console.log('Error fetching the feed: ', error);
      });
  }

  onPressVideo(videoID) {
    this.props.navigator.push({ name: 'player', videoID });
  }

  parseVideos(responseText) {
    const xml = new DOMParser().parseFromString(responseText, 'text/xml');
    const thumbnails = xml.getElementsByTagName('media:thumbnail');
    const videos = [...xml.getElementsByTagName('yt:videoId')];
    const parsedVideos = videos.map((video, i) => ({
      available: i === 0,
      id: video.textContent,
      thumbnail: thumbnails[i].getAttribute('url'),
    }));
    this.setState({ videos: parsedVideos });
  }

  render() {
    return (
      <View>
        <Text style={styles.header}>
          Lessons
        </Text>
        <ScrollView>
          {this.state.videos.map(video =>
            <TouchableOpacity
              key={video.thumbnail}
              onPress={() => {
                if (video.available) {
                  this.onPressVideo(video.id);
                }
              }}
            >
              <Image
                resizeMode={Image.resizeMode.cover}
                source={{ uri: video.thumbnail }}
                style={{
                  height: 180,
                  opacity: video.available ? 1 : 0.5,
                }}
              />
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ff9933',
    color: 'white',
    fontFamily: 'Futura',
    fontSize: 48,
    padding: 12,
    textAlign: 'center',
  },
});

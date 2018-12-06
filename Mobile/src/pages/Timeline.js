import React, { Component } from 'react';
import api from '../services/Api';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Tweet from '../components/Tweets';
import Icon from 'react-native-vector-icons/MaterialIcons';
import socket from 'socket.io-client';

export default class Timeline extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Inicio",
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('New')}>
        <Icon
          name="add-circle-outline"
          style={{ marginRight: 20 }}
          size={24}
          color="#4BB0EE"
        />
      </TouchableOpacity>
    )
  });

  state = {
    tweets: [],
  };

  async componentDidMount() {
    this.subscribeToEvents();
    const response = await api.get('tweets');
    this.setState({ tweets: response.data });
  }

  subscribeToEvents = () => {
    const io = socket('http://10.0.3.2:8080');
    io.on('tweet', data => {
      this.setState({ tweets: [data, ...this.state.tweets] })
    });
    io.on('like', data => {
      this.setState({
        tweets: this.state.tweets.map(
          tweet => (tweet._id === data._id ? data : tweet)
        )
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.tweets}
          keyExtractor={tweet => tweet._id}
          renderItem={({ item }) => <Tweet tweet={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});

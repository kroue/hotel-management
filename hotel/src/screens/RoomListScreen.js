import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from '../api/axios';  // Make sure axios instance is correctly set

export default function RoomListScreen({ route, navigation }) {
  const { token } = route.params;
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('rooms/', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setRooms(res.data));
  }, []);

  const renderRoomItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RoomDetail', { room: item, token })}  // Navigate to RoomDetailScreen
    >
      <Image source={{ uri: item.photo }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.roomName}>{item.name}</Text>
        <Text style={styles.roomLocation}>{item.location}</Text>
        <Text style={styles.roomDetails}>{item.distance} km to city</Text>
        <Text style={styles.roomPrice}>${item.price_per_night} per night</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={item => item.id.toString()}
        renderItem={renderRoomItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3, // For shadow on Android
    shadowColor: '#000', // For shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  roomName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  roomLocation: {
    fontSize: 14,
    color: '#666',
  },
  roomDetails: {
    fontSize: 12,
    color: '#999',
  },
  roomPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff3366',
  },
});

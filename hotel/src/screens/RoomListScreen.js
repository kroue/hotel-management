import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

export default function RoomListScreen({ route, navigation }) {
  const token = route?.params?.token || ''; // Fallback to an empty string if token is undefined
  const username = route?.params?.username || 'Guest'; // Fallback to 'Guest' if username is undefined
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!token) {
      Alert.alert('Error', 'Token is missing. Please log in again.');
      navigation.navigate('Login'); // Redirect to login if token is missing
      return;
    }

    fetch('http://192.168.1.32/hotel-management/api/get_rooms.php', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.error('Error fetching rooms:', error));
  }, [token]);

  const renderRoomItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
    >
      <Image source={{ uri: item.picture_link }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.roomName}>{item.name}</Text>
        <Text style={styles.roomPrice}>₱{item.price}</Text>
        <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('RoomDetail', { room: item, token })} >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {username}</Text>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search rooms..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredRooms}
        keyExtractor={(item, index) => index.toString()} // Use index as a fallback key
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
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3, // For shadow on Android
    shadowColor: '#000', // For shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
  },
  searchButton: {
    backgroundColor: '#666',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
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
  roomPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff3366',
    marginTop: 5,
  },
  bookButton: {
    backgroundColor: '#333',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
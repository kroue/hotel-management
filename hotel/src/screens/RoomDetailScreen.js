import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import axios from '../api/axios';

export default function RoomDetailScreen({ route, navigation }) {
  const { room, token } = route.params;
  const [isAvailable, setIsAvailable] = useState(room.available);  // Room availability

  const handleBooking = () => {
    if (!isAvailable) {
      Alert.alert('Sorry', 'This room is not available.');
      return;
    }

    // Call API to book the room
    axios.post(
      'bookings/',  // Replace with the correct booking endpoint
      {
        user: 'USER_ID', // Replace with actual user ID
        room: room.id,
        start_date: '2025-04-10',  // Example date, replace with dynamic date
        end_date: '2025-04-15',  // Example date, replace with dynamic date
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then(response => {
        Alert.alert('Booking Success', 'Your room has been booked!');
        setIsAvailable(false);  // Mark room as unavailable after booking
      })
      .catch(error => {
        console.error('Error booking the room:', error);
        Alert.alert('Error', 'There was an error booking the room.');
      });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: room.photo }} style={styles.image} />
      <Text style={styles.roomName}>{room.name}</Text>
      <Text style={styles.roomDescription}>{room.description}</Text>
      <Text style={styles.roomPrice}>${room.price_per_night} per night</Text>
      <Text style={styles.roomAvailability}>
        {isAvailable ? 'Available' : 'Not Available'}
      </Text>
      <Button title="Book Now" onPress={handleBooking} disabled={!isAvailable} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  roomName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  roomDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  roomPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff3366',
  },
  roomAvailability: {
    fontSize: 16,
    marginVertical: 10,
    color: 'green',
  },
});

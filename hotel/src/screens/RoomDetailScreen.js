import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RoomDetailScreen({ route, navigation }) {
  const { room } = route.params;

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [estimatedArrivalTime, setEstimatedArrivalTime] = useState(null);
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [showArrivalTimePicker, setShowArrivalTimePicker] = useState(false);

  const handleBookNow = async () => {
    if (!checkIn || !checkOut || !firstName || !lastName || !email || !contactNumber || !estimatedArrivalTime) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.32/hotel-management/api/book_room.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room_id: room.id,
          room_name: room.name,
          check_in: checkIn.toISOString().split('T')[0], // Format date as YYYY-MM-DD
          check_out: checkOut.toISOString().split('T')[0], // Format date as YYYY-MM-DD
          adult_count: adults,
          child_count: children,
          first_name: firstName,
          last_name: lastName,
          email_address: email,
          contact_number: contactNumber,
          estimated_arrival_time: estimatedArrivalTime.toISOString().split('T')[1].slice(0, 5), // Format time as HH:MM
          total_price: room.price,
        }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert('Success', 'Your booking has been confirmed!');
        navigation.navigate('Rooms'); // Navigate back to the RoomListScreen
      } else {
        Alert.alert('Error', data.message || 'Booking failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Image at the top */}
      <Image source={{ uri: room.picture_link }} style={styles.image} />

      {/* Room Name */}
      <Text style={styles.roomName}>{room.name}</Text>

      {/* Booking Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Booking Details</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowCheckInPicker(true)}
          >
            <Text>{checkIn ? checkIn.toISOString().split('T')[0] : 'Check In'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowCheckOutPicker(true)}
          >
            <Text>{checkOut ? checkOut.toISOString().split('T')[0] : 'Check Out'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Adult"
            value={adults}
            onChangeText={setAdults}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Child"
            value={children}
            onChangeText={setChildren}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowArrivalTimePicker(true)}
        >
          <Text>
            {estimatedArrivalTime
              ? estimatedArrivalTime.toISOString().split('T')[1].slice(0, 5)
              : 'Estimated Arrival Time'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Guest Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Guest Details</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
        />
      </View>

      {/* Booking Summary Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Booking Summary</Text>
        <Text style={styles.summaryText}>{room.name}</Text>
        <Text style={styles.summaryText}>₱{room.price}</Text>
        <Text style={styles.summaryText}>Check In: {checkIn ? checkIn.toISOString().split('T')[0] : 'N/A'}</Text>
        <Text style={styles.summaryText}>Check Out: {checkOut ? checkOut.toISOString().split('T')[0] : 'N/A'}</Text>
        <Text style={styles.summaryText}>Total: ₱{room.price}</Text>
      </View>

      {/* Book Now Button */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>

      {/* Date and Time Pickers */}
      {showCheckInPicker && (
        <DateTimePicker
          value={checkIn || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowCheckInPicker(false);
            if (selectedDate) setCheckIn(selectedDate);
          }}
        />
      )}
      {showCheckOutPicker && (
        <DateTimePicker
          value={checkOut || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowCheckOutPicker(false);
            if (selectedDate) setCheckOut(selectedDate);
          }}
        />
      )}
      {showArrivalTimePicker && (
        <DateTimePicker
          value={estimatedArrivalTime || new Date()}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowArrivalTimePicker(false);
            if (selectedTime) setEstimatedArrivalTime(selectedTime);
          }}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  roomName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    marginRight: 10,
    justifyContent: 'center',
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  bookButton: {
    backgroundColor: '#333',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
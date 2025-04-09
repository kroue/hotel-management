import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from '../api/axios'; // Ensure this points to your axios instance

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleRegister = async () => {
  try {
    const response = await axios.post('register/', {
      username,
      email,
      password,
    });
    
    if (response.status === 201) {
      Alert.alert('Success', 'Registration successful. Please log in.');
      navigation.navigate('Login'); // Navigate to the login screen after successful registration
    } else {
      Alert.alert('Error', 'Unexpected response. Please try again.');
    }
  } catch (error) {
    if (error.response) {
      console.log('Error response:', error.response);  // Log the error response
      Alert.alert('Error', error.response.data.detail || 'Registration failed');
    } else {
      console.log('Error:', error);  // Log network error
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  }
};

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Please fill in the details below to create your account.</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>REGISTER</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginRedirect}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  registerButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#ff3366',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginRedirect: {
    color: '#007bff',
    fontSize: 14,
    marginTop: 10,
  },
});

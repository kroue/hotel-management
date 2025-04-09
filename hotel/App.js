import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen'; 
import RoomListScreen from './src/screens/RoomListScreen';
import RoomDetailScreen from './src/screens/RoomDetailScreen';  // Adjust the path

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Rooms" component={RoomListScreen} />
        <Stack.Screen name="RoomDetail" component={RoomDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

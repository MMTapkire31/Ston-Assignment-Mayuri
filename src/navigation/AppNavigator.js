import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from '../screens/LoginScreen';
import DriveListScreen from '../screens/DriveListScreen';
import DriveDetailScreen from '../screens/DriveDetailScreen';
import MyApplicationsScreen from '../screens/MyApplicationsScreen';
import AdmitCardScreen from '../screens/AdmitCardScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DrivesIcon() {
  return <Text>🏢</Text>;
}

function ApplicationsIcon() {
  return <Text>📋</Text>;
}

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="DriveList"
        component={DriveListScreen}
        options={{
          title: 'Placement Drives',
          tabBarLabel: 'Drives',
          tabBarIcon: DrivesIcon,
        }}
      />
      <Tab.Screen
        name="MyApplications"
        component={MyApplicationsScreen}
        options={{
          title: 'My Applications',
          tabBarLabel: 'Applications',
          tabBarIcon: ApplicationsIcon,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="DriveDetail"
          component={DriveDetailScreen}
          options={{ title: 'Drive Details' }}
        />
        <Stack.Screen
          name="AdmitCard"
          component={AdmitCardScreen}
          options={{ title: 'Admit Card' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

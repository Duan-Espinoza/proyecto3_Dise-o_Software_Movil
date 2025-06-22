import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import DocumentsScreen from '../screens/DocumentsScreen';
import BlogsScreen from '../screens/BlogsScreen';
import { COLORS } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { backgroundColor: COLORS.secondary },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          if (route.name === 'Inicio') iconName = 'home';
          else if (route.name === 'Noticias') iconName = 'newspaper';
          else if (route.name === 'Documentos') iconName = 'document-text';
          else if (route.name === 'Blogs') iconName = 'book';
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Noticias" component={NewsScreen} />
      <Tab.Screen name="Documentos" component={DocumentsScreen} />
      <Tab.Screen name="Blogs" component={BlogsScreen} />
    </Tab.Navigator>
  );
}
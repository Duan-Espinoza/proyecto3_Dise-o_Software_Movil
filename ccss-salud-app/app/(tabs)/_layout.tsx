import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          if (route.name === 'index') iconName = 'home';
          else if (route.name === 'noticias') iconName = 'newspaper';
          else if (route.name === 'documentos') iconName = 'document-text';
          else if (route.name === 'blogs') iconName = 'book';
          else if (route.name === 'notificaciones') iconName = 'notifications';
          else if (route.name === 'explore') iconName = 'search'; // Cambia el ícono a search
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
      <Tabs.Screen name="noticias" options={{ title: 'Noticias' }} />
      <Tabs.Screen name="documentos" options={{ title: 'Documentos' }} />
      <Tabs.Screen name="blogs" options={{ title: 'Blogs' }} />
      <Tabs.Screen name="explore" options={{ title: 'Búsqueda' }} /> 
      <Tabs.Screen name="notificaciones" options={{ title: 'Notificaciones' }} />
    </Tabs>
  );
}
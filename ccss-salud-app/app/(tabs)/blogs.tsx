import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderLogo from '../components/HeaderLogo';
import { registerForPushNotificationsAsync, sendLocalNotification } from '../utils/notifications';
import { getAllBlogs } from '../services/api';

export default function BlogsTab() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    registerForPushNotificationsAsync();

    let prevCount = 0;
    getAllBlogs().then(res => {
      prevCount = res.data.length;
      setBlogs(res.data);
    });

    const interval = setInterval(() => {
      getAllBlogs().then(res => {
        if (res.data.length > prevCount) {
          sendLocalNotification('¡Nuevo blog!', 'Hay un nuevo blog disponible.');
        }
        prevCount = res.data.length;
        setBlogs(res.data);
      });
    }, 10000); // cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <HeaderLogo />
      <Text style={styles.title}>Blogs</Text>
      <Text style={styles.subtitle}>Aquí se mostrarán los blogs recientes.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F6FFF8' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#00723F', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#222' },
});
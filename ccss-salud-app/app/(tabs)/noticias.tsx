import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderLogo from '../components/HeaderLogo';
import { registerForPushNotificationsAsync, sendLocalNotification } from '../utils/notifications';
import { getAllNoticias } from '../services/api';

export default function NoticiasTab() {
  const [noticias, setNoticias] = useState<any[]>([]);

  useEffect(() => {
    registerForPushNotificationsAsync();

    let prevCount = 0;
    getAllNoticias().then(res => {
      prevCount = res.data.length;
      setNoticias(res.data);
    });

    const interval = setInterval(() => {
      getAllNoticias().then(res => {
        if (res.data.length > prevCount) {
          sendLocalNotification('¡Nueva noticia!', 'Hay una noticia nueva disponible.');
        }
        prevCount = res.data.length;
        setNoticias(res.data);
      });
    }, 10000); // cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <HeaderLogo />
      <Text style={styles.title}>Noticias</Text>
      <Text style={styles.subtitle}>Aquí se mostrarán las noticias recientes.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F6FFF8' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#00723F', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#222' },
});
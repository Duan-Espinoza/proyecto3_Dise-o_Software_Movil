import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import * as Notifications from 'expo-notifications';
import HeaderLogo from '../components/HeaderLogo';
import { COLORS } from '../constants/colors';

type NotificationItem = {
  id: string;
  title: string;
  body: string;
};

export default function NotificacionesTab() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      setNotifications(prev => [
        {
          id: notification.request.identifier,
          title: notification.request.content.title ?? 'Notificación',
          body: notification.request.content.body ?? '',
        },
        ...prev,
      ]);
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderLogo />
      <Text style={styles.title}>Notificaciones</Text>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardBody}>{item.body}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay notificaciones aún.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary, margin: 16 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  cardTitle: { fontWeight: 'bold', fontSize: 16, color: COLORS.primary },
  cardBody: { color: COLORS.text, marginTop: 4 },
  empty: { color: '#888', textAlign: 'center', marginTop: 32 },
});
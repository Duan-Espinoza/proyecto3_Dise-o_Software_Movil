import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import HeaderLogo from '../components/HeaderLogo';
import { getAllDocuments } from '../services/api';
import { COLORS } from '../constants/colors';
import { registerForPushNotificationsAsync, sendLocalNotification } from '../utils/notifications';

type Document = {
  id_pdf: number;
  nombre_pdf: string;
};

export default function DocumentosTab() {
  const [docs, setDocs] = useState<Document[]>([]);

  useEffect(() => {
    registerForPushNotificationsAsync();

    let prevCount = 0;
    getAllDocuments().then(res => {
      prevCount = res.data.length;
      setDocs(res.data);
    });

    const interval = setInterval(() => {
      getAllDocuments().then(res => {
        if (res.data.length > prevCount) {
          sendLocalNotification('¡Nuevo documento!', 'Hay un nuevo documento PDF disponible.');
        }
        prevCount = res.data.length;
        setDocs(res.data);
      });
    }, 10000); // cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  const openPdf = (id_pdf: number) => {
    const pdfUrl = `http://TU_BACKEND/api/documentos/${id_pdf}/pdf`;
    Linking.openURL(pdfUrl);
  };

  return (
    <View style={styles.container}>
      <HeaderLogo />
      <Text style={styles.title}>Documentos PDF</Text>
      <FlatList
        data={docs}
        keyExtractor={item => item.id_pdf.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nombre_pdf}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => openPdf(item.id_pdf)}
            >
              <Text style={styles.buttonText}>Ver PDF</Text>
            </TouchableOpacity>
          </View>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: { color: COLORS.text, fontSize: 16 },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
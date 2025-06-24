import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import HeaderLogo from '../components/HeaderLogo';
import { COLORS } from '../constants/colors';
import { getAllDocumentosLocal } from '../services/documentosLocal';
import { useRouter } from 'expo-router';

type Documento = {
  id_pdf: number;
  nombre_pdf: string;
  archivo: string;
};

export default function DocumentosTab() {
  const [docs, setDocs] = useState<Documento[]>([]);
  const router = useRouter();

  useEffect(() => {
    getAllDocumentosLocal().then(setDocs);
  }, []);

  return (
    <View style={styles.container}>
      <HeaderLogo />
      <Text style={styles.title}>Documentos PDF</Text>
      <FlatList
        data={docs}
        keyExtractor={item => item.id_pdf.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: '/documentoDetalle', params: { id: item.id_pdf } })}
          >
            <Text style={styles.cardTitle}>{item.nombre_pdf}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary, margin: 16 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  cardTitle: { fontWeight: 'bold', fontSize: 16, color: COLORS.primary },
});
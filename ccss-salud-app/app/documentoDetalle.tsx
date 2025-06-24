import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { getDocumentoByIdLocal } from './services/documentosLocal';
import { COLORS } from './constants/colors';
import HeaderLogo from './components/HeaderLogo';

type Documento = {
  id_pdf: number;
  nombre_pdf: string;
  archivo: string; // ahora es una URL
};

export default function DocumentoDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [doc, setDoc] = useState<Documento | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      getDocumentoByIdLocal(Number(id)).then(doc => setDoc(doc ?? null));
    }
  }, [id]);

  if (!doc) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Cargando documento...</Text>
      </View>
    );
  }

  const handleOpenPdf = async () => {
    await WebBrowser.openBrowserAsync(doc.archivo);
  };

  return (
    <View style={styles.container}>
      <HeaderLogo />
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Volver</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{doc.nombre_pdf}</Text>
      <TouchableOpacity style={styles.button} onPress={handleOpenPdf}>
        <Text style={styles.buttonText}>Ver PDF</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 16 },
  loading: { fontSize: 18, color: COLORS.primary, textAlign: 'center', marginTop: 20 },
  back: { color: COLORS.primary, marginBottom: 12, fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary, marginBottom: 12, textAlign: 'center' },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
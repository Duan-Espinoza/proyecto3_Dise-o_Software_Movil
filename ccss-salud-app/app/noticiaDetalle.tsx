import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { getNoticiaByIdLocal } from './services/noticiasLocal';
import { COLORS } from './constants/colors';
import HeaderLogo from './components/HeaderLogo';

type News = {
  id_noticia: number;
  titulo: string;
  imagen?: string;
  contenido: string;
};

export default function NoticiaDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [noticia, setNoticia] = useState<News | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      getNoticiaByIdLocal(Number(id)).then(noticia => setNoticia(noticia ?? null));
    }
  }, [id]);

  if (!noticia) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Cargando noticia...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <HeaderLogo />
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Volver</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{noticia.titulo}</Text>
      {noticia.imagen && (
        <Image source={{ uri: noticia.imagen }} style={styles.image} />
      )}
      <Text style={styles.content}>{noticia.contenido}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 16 },
  loading: { fontSize: 18, color: COLORS.primary, textAlign: 'center', marginTop: 20 },
  back: { color: COLORS.primary, marginBottom: 12, fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary, marginBottom: 12, textAlign: 'center' },
  image: { width: '100%', height: 200, borderRadius: 8, marginBottom: 16 },
  content: { fontSize: 16, color: COLORS.text, lineHeight: 22, marginBottom: 24 },
});
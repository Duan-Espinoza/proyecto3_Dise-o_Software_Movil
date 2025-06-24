import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import HeaderLogo from '../components/HeaderLogo';
import { COLORS } from '../constants/colors';
import { getAllNoticiasLocal } from '../services/noticiasLocal';
import { useRouter } from 'expo-router';

type News = {
  id_noticia: number;
  titulo: string;
  imagen?: string;
  contenido: string;
};

export default function NoticiasTab() {
  const [noticias, setNoticias] = useState<News[]>([]);
  const router = useRouter();

  useEffect(() => {
    getAllNoticiasLocal().then(setNoticias);
  }, []);

  return (
    <View style={styles.container}>
      <HeaderLogo />
      <Text style={styles.title}>Noticias</Text>
      <FlatList
        data={noticias}
        keyExtractor={item => item.id_noticia.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: '/(tabs)/noticias', params: { id: item.id_noticia } })}
          >
            {item.imagen && (
              <Image source={{ uri: item.imagen }} style={styles.image} />
            )}
            <Text style={styles.cardTitle}>{item.titulo}</Text>
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
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  image: { width: 80, height: 60, borderRadius: 8, marginRight: 8 },
  cardTitle: { fontWeight: 'bold', fontSize: 16, color: COLORS.primary, flex: 1, flexWrap: 'wrap' },
});
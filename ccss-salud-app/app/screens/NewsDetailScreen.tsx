// NewsDetailScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
// Update this import to match the actual export from '../services/api'
import { getNewsById } from '../services/api';
import { COLORS } from '../constants/colors';
import { News } from '../types/types';
import { useRoute } from '@react-navigation/native';
import HeaderLogo from '../components/HeaderLogo';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// Define RootStackParamList if not already defined elsewhere
type RootStackParamList = {
  News: { id_noticia: number };
  // add other screens here if needed
};
type NewsDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'News'>;
export default function NewsDetailScreen() {
  const [news, setNews] = useState<News | null>(null);
  const route = useRoute();
  const navigation = useNavigation<NewsDetailScreenNavigationProp>();
  const { id_noticia } = route.params as { id_noticia: number };

  useEffect(() => {
    getNewsById(id_noticia).then((res: { data: Omit<News, 'id_noticia'> }) => setNews({ ...res.data, id_noticia }));
  }, [id_noticia]);

  if (!news) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando noticia...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <HeaderLogo />
      <Text style={styles.title}>{news.titulo}</Text>
      <Image source={{ uri: news.imagen }} style={styles.image} />
      <Text style={styles.content}>{news.contenido}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  loadingText: {
    fontSize: 18,
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 12,
    marginTop: 12,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: 24,
  },
});

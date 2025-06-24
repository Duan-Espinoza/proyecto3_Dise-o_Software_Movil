import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { getBlogByIdLocal } from './services/blogsLocal';
import { COLORS } from './constants/colors';
import HeaderLogo from './components/HeaderLogo';

type Blog = {
  id_blog: number;
  titulo: string;
  imagen?: string;
  contenido: string;
};

export default function BlogDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      getBlogByIdLocal(Number(id)).then(blog => setBlog(blog ?? null));
    }
  }, [id]);

  if (!blog) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Cargando blog...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
      <HeaderLogo />
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{blog.titulo}</Text>
      {blog.imagen && (
        <View style={styles.imageWrapper}>
          <Image source={{ uri: blog.imagen }} style={styles.image} />
        </View>
      )}
      <Text style={styles.content}>{blog.contenido}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loading: {
    fontSize: 18,
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: COLORS.card,
    marginTop: 8,
  },
  backText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 14,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 32,
  },
  imageWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  content: {
    fontSize: 17,
    color: COLORS.text,
    lineHeight: 25,
    marginBottom: 24,
    textAlign: 'justify',
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 10,
    width: '100%',
    shadowColor: COLORS.primary,
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
});
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import SearchBar from '../components/SearchBar';
import { getAllDocuments, getAllNoticias, getAllBlogs } from '../services/api';
import { COLORS } from '../constants/colors';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Document = { id_pdf: number; nombre_pdf: string; };
type Noticia = { id_noticia: number; titulo: string; };
type Blog = { id_blog: number; titulo: string; };

function normalize(str: string) {
  return (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export default function ExploreTab() {
  const [search, setSearch] = useState('');
  const [docs, setDocs] = useState<Document[]>([]);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();

  useEffect(() => {
    getAllDocuments().then(res => {
      setDocs(res.data);
      console.log('Docs:', res.data);
    });
    getAllNoticias().then(res => {
      setNoticias(res.data);
      console.log('Noticias:', res.data);
    });
    getAllBlogs().then(res => {
      setBlogs(res.data);
      console.log('Blogs:', res.data);
    });
  }, []);

  const searchNorm = normalize(search);
  console.log('search:', search, 'searchNorm:', searchNorm);

  const filteredDocs = docs.filter(d =>
    d.nombre_pdf && normalize(d.nombre_pdf).includes(searchNorm)
  );
  const filteredNoticias = noticias.filter(n =>
    n.titulo && normalize(n.titulo).includes(searchNorm)
  );
  const filteredBlogs = blogs.filter(b =>
    b.titulo && normalize(b.titulo).includes(searchNorm)
  );

  const noResults =
    search !== '' &&
    filteredDocs.length === 0 &&
    filteredNoticias.length === 0 &&
    filteredBlogs.length === 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="search" size={32} color={COLORS.primary} style={{ marginRight: 8 }} />
        <Text style={styles.headerTitle}>Búsqueda</Text>
      </View>
      <SearchBar value={search} onChangeText={setSearch} placeholder="Buscar por título..." />

      {(filteredDocs.length > 0 || search === '') && (
        <>
          <Text style={styles.section}>Documentos PDF</Text>
          <FlatList
            data={filteredDocs}
            keyExtractor={item => item.id_pdf.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => router.push({ pathname: '/documentoDetalle', params: { id: item.id_pdf } })}
              >
                <Ionicons name="document-text-outline" size={22} color={COLORS.primary} style={{ marginRight: 8 }} />
                <Text style={styles.cardTitle}>{item.nombre_pdf}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.empty}>No hay documentos.</Text>}
          />
        </>
      )}

      {(filteredNoticias.length > 0 || search === '') && (
        <>
          <Text style={styles.section}>Noticias</Text>
          <FlatList
            data={filteredNoticias}
            keyExtractor={item => item.id_noticia.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => router.push({ pathname: '/noticiaDetalle', params: { id: item.id_noticia } })}
              >
                <Ionicons name="newspaper-outline" size={22} color={COLORS.primary} style={{ marginRight: 8 }} />
                <Text style={styles.cardTitle}>{item.titulo}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.empty}>No hay noticias.</Text>}
          />
        </>
      )}

      {(filteredBlogs.length > 0 || search === '') && (
        <>
          <Text style={styles.section}>Blogs</Text>
          <FlatList
            data={filteredBlogs}
            keyExtractor={item => item.id_blog.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => router.push({ pathname: '/blogDetalle', params: { id: item.id_blog } })}
              >
                <Ionicons name="book-outline" size={22} color={COLORS.primary} style={{ marginRight: 8 }} />
                <Text style={styles.cardTitle}>{item.titulo}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.empty}>No hay blogs.</Text>}
          />
        </>
      )}

      {noResults && (
        <Text style={[styles.empty, { marginTop: 32 }]}>No se encontraron resultados.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingTop: Platform.OS === 'ios' ? 48 : 24 },
  header: { flexDirection: 'row', alignItems: 'center', margin: 16, marginBottom: 0 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: COLORS.primary },
  section: { fontWeight: 'bold', fontSize: 18, color: COLORS.primary, margin: 16, marginBottom: 4 },
  card: {
    backgroundColor: COLORS.card,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardTitle: { color: COLORS.text, fontSize: 16, fontWeight: '500', flex: 1, flexWrap: 'wrap' },
  empty: { color: '#888', textAlign: 'center', marginVertical: 8 },
});
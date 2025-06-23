import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar';
import { getAllDocuments, getAllNoticias, getAllBlogs } from '../services/api';
import { COLORS } from '../constants/colors';

type Document = { id_pdf: number; nombre_pdf: string; };
type Noticia = { id_noticia: number; titulo: string; };
type Blog = { id_blog: number; titulo: string; };

export default function ExploreTab() {
  const [search, setSearch] = useState('');
  const [docs, setDocs] = useState<Document[]>([]);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    getAllDocuments().then(res => setDocs(res.data));
    getAllNoticias().then(res => setNoticias(res.data));
    getAllBlogs().then(res => setBlogs(res.data));
  }, []);

  const filteredDocs = docs.filter(d => d.nombre_pdf.toLowerCase().includes(search.toLowerCase()));
  const filteredNoticias = noticias.filter(n => n.titulo.toLowerCase().includes(search.toLowerCase()));
  const filteredBlogs = blogs.filter(b => b.titulo.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} placeholder="Buscar por título..." />
      <Text style={styles.section}>Documentos PDF</Text>
      <FlatList
        data={filteredDocs}
        keyExtractor={item => item.id_pdf.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.nombre_pdf}</Text>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay documentos.</Text>}
      />
      <Text style={styles.section}>Noticias</Text>
      <FlatList
        data={filteredNoticias}
        keyExtractor={item => item.id_noticia.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.titulo}</Text>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay noticias.</Text>}
      />
      <Text style={styles.section}>Blogs</Text>
      <FlatList
        data={filteredBlogs}
        keyExtractor={item => item.id_blog.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.titulo}</Text>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay blogs.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  section: { fontWeight: 'bold', fontSize: 18, color: COLORS.primary, margin: 16, marginBottom: 4 },
  item: { backgroundColor: COLORS.card, padding: 12, marginHorizontal: 16, marginVertical: 4, borderRadius: 8, color: COLORS.text },
  empty: { color: '#888', textAlign: 'center', marginVertical: 8 },
});
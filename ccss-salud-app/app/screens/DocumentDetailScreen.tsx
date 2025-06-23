// DocuementDetailScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { getDocumentById } from '../services/api';
import { COLORS } from '../constants/colors';
import { Document } from '../types/types';
import { useRoute } from '@react-navigation/native';
import HeaderLogo from '../components/HeaderLogo';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// Define RootStackParamList if not already defined elsewhere
type RootStackParamList = {
  Document: { id_documento: number };
  // add other screens here if needed
};
type DocumentDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Document'>;
export default function DocumentDetailScreen() {
  const [document, setDocument] = useState<Document | null>(null);
  const route = useRoute();
  const navigation = useNavigation<DocumentDetailScreenNavigationProp>();
  const { id_documento } = route.params as { id_documento: number };

  useEffect(() => {
    getDocumentById(id_documento).then(res => setDocument({ ...res.data, id_documento }));
  }, [id_documento]);

  if (!document) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando documento...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <HeaderLogo />
      <Text style={styles.title}>{document.titulo}</Text>
      <Image source={{ uri: document.imagen }} style={styles.image} />
      <Text style={styles.content}>{document.contenido}</Text>
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
// Ensure you have the necessary imports and types defined
// Adjust the API service function to match your backend structure  
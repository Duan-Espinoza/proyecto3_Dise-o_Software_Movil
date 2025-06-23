import { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { getAllDocuments } from '../services/api';
import { COLORS } from '../constants/colors';
import { Document } from '../types/types';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Define your stack param list
type RootStackParamList = {
  DocumentsScreen: undefined;
  DocumentDetail: { id: number };
};

type DocumentsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DocumentsScreen'>;

type Props = {
  navigation: DocumentsScreenNavigationProp;
};

export default function DocumentsScreen({ navigation }: Props) {
  const [docs, setDocs] = useState<Document[]>([]);

  useEffect(() => {
    getAllDocuments().then(res => setDocs(res.data));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Text style={styles.title}>Documentos PDF</Text>
      <FlatList
        data={docs}
        keyExtractor={item => item.id_pdf.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('DocumentDetail', { id: item.id_pdf })}>
            <View style={styles.card}>
              <Text style={styles.name}>{item.nombre_pdf}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// ...styles...

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary, margin: 16 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  name: { color: COLORS.text, fontSize: 16 },
});
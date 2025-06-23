import { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { getAllNoticias } from '../services/api';
import { News } from '../types/types';
import NewsCard from '../components/NewsCard';
import { COLORS } from '../constants/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  NewsDetail: { id: number };
  // add other screens if needed
};

type NewsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'NewsDetail'>;
};

export default function NewsScreen({ navigation }: NewsScreenProps) {
  const [noticias, setNoticias] = useState<News[]>([]);

  useEffect(() => {
    getAllNoticias().then(res => setNoticias(res.data));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Text style={styles.title}>Noticias</Text>
      <FlatList
        data={noticias}
        keyExtractor={item => item.id_noticia.toString()}
        renderItem={({ item }) => (
          <NewsCard
            title={item.titulo}
            content={item.contenido || ''}
            category={''}
            date={''}
            onPress={() => navigation.navigate('NewsDetail', { id: item.id_noticia })}
          />
        )}
      />
    </View>
  );
}

// ...styles...

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary, margin: 16 },
});
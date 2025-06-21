import { FlatList, Text, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { getAllNoticias } from '../services/api';
import NewsCard from '../components/NewsCard';
import { COLORS } from '../constants/colors';

import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  NewsDetail: { id: number };
  // add other routes here if needed
};

type NewsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NewsDetail'>;

interface NewsScreenProps {
  navigation: NewsScreenNavigationProp;
}

interface Noticia {
  id_noticia: number;
  // add other properties as needed, e.g. title: string;
}

export default function NewsScreen({ navigation }: NewsScreenProps) {
  const [noticias, setNoticias] = useState<Noticia[]>([]);

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
          <NewsCard title={''} content={''} category={''} date={''} {...item} onPress={() => navigation.navigate('NewsDetail', { id: item.id_noticia })} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary, margin: 16 },
});
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import HeaderLogo from '../components/HeaderLogo';
import NewsCard from '../components/NewsCard';
import BlogCard from '../components/BlogCard';
import { getTopNoticias, getTopBlogs } from '../services/api';
import { COLORS } from '../constants/colors';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  NewsDetail: { id: number };
  BlogDetail: { id: number };
  // add other routes here if needed
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

type Noticia = {
  id_noticia: number;
  // add other properties as needed
  [key: string]: any;
};

type Blog = {
  id_blog: number;
  // add other properties as needed
  [key: string]: any;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    getTopNoticias().then(res => setNoticias(res.data));
    getTopBlogs().then(res => setBlogs(res.data));
  }, []);

  return (
    <ScrollView style={{ backgroundColor: COLORS.background }}>
      <HeaderLogo />
      <Text style={styles.sectionTitle}>Top 3 Noticias</Text>
      {noticias.map((n, i) => (
        <NewsCard title={''} content={''} category={''} date={''} key={i} {...n} onPress={() => navigation.navigate('NewsDetail', { id: n.id_noticia })} />
      ))}
      <Text style={styles.sectionTitle}>Top 3 Blogs</Text>
      {blogs.map((b, i) => (
        <BlogCard title={''} content={''} author={''} date={''} category={''} key={i} {...b} onPress={() => navigation.navigate('BlogDetail', { id: b.id_blog })} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8,
  },
});
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getAllBlogs } from '../services/api';
import { Blog } from '../types/types';
import { COLORS } from '../constants/colors';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Blogs: undefined;
  BlogDetail: { id: number };
};

type BlogsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Blogs'>;

interface BlogsScreenProps {
  navigation: BlogsScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'Blogs'>;
}

export default function BlogsScreen({ navigation }: BlogsScreenProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    getAllBlogs().then(res => setBlogs(res.data));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blogs</Text>
      <FlatList
        data={blogs}
        keyExtractor={item => item.id_blog.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BlogDetail', { id: item.id_blog })}>
            <Text style={styles.name}>{item.titulo}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// ...styles...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: '500',
  },
});
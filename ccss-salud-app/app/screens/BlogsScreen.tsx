//BlogScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import HeaderLogo from '../components/HeaderLogo';
import { getAllBlogs } from '../services/api';
import { COLORS } from '../constants/colors';
import { useEffect, useState } from 'react';
import { Blog } from '../types/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define RootStackParamList if not already defined elsewhere
type RootStackParamList = {
  Blog: { id_blog: number };
  // add other screens here if needed
};

type BlogScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Blog'>;
export default function BlogsScreen() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigation = useNavigation<BlogScreenNavigationProp>();

  useEffect(() => {
    getAllBlogs().then(res => setBlogs(res.data));
  }, []);

  const openBlog = (id_blog: number) => {
    navigation.navigate('Blog', { id_blog });
  };

  return (
    <View style={styles.container}>
      <HeaderLogo />
      <Text style={styles.title}>Blogs</Text>
      <FlatList
        data={blogs}
        keyExtractor={item => item.id_blog.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openBlog(item.id_blog)}>
            <Text style={styles.name}>{item.titulo}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

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
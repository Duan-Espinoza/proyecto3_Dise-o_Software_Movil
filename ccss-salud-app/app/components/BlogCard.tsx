import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

type BlogCardProps = {
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  onPress: () => void;
};

export default function BlogCard({ title, content, author, date, category, onPress }: BlogCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.author}>Por {author}</Text>
        <Text style={styles.content} numberOfLines={3}>{content}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  title: { fontWeight: 'bold', fontSize: 18, color: COLORS.primary },
  category: { color: COLORS.accent, fontWeight: '600', marginBottom: 4 },
  author: { color: COLORS.primary, fontWeight: '500', marginBottom: 4 },
  content: { color: COLORS.text, marginBottom: 8 },
  date: { color: '#888', fontSize: 12, textAlign: 'right' },
});
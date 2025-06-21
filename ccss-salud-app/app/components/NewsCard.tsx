import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

type NewsCardProps = {
  title: string;
  content: string;
  category: string;
  date: string;
  onPress?: () => void;
};

export default function NewsCard({ title, content, category, date, onPress }: NewsCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.content} numberOfLines={3}>{content}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
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
  content: { color: COLORS.text, marginBottom: 8 },
  date: { color: '#888', fontSize: 12, textAlign: 'right' },
});
import { View, Text, StyleSheet } from 'react-native';

export default function NoticiasTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Noticias</Text>
      <Text style={styles.subtitle}>Aquí se mostrarán las noticias recientes.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F6FFF8' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#00723F', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#222' },
});
import { View, Text, StyleSheet } from 'react-native';
import HeaderLogo from '../components/HeaderLogo';

export default function HomeTab() {
  return (
    <View style={styles.container}>
      <HeaderLogo />
      <Text style={styles.title}>Bienvenido a la app CCSS</Text>
      <Text style={styles.subtitle}>Selecciona una pestaña para comenzar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F6FFF8' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#00723F', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#222' },
});
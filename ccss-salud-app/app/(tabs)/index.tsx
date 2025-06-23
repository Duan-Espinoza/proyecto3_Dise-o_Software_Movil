import { View, Text, StyleSheet, Image } from 'react-native';
import { useEffect } from 'react';
import HeaderLogo from '../components/HeaderLogo';
import { registerForPushNotificationsAsync } from '../utils/notifications';
import { COLORS } from '../constants/colors';

export default function HomeTab() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.headerContainer}>
        <HeaderLogo />
        <Text style={styles.title}>Bienvenido(a) a la app CCSS</Text>
        <Text style={styles.subtitle}>
          Tu acceso móvil a documentos, noticias y blogs institucionales.
        </Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>🩺 Información Importante</Text>
        <Text style={styles.infoText}>
          Mantente al día con las últimas noticias, accede a documentos oficiales y explora los blogs de la Caja Costarricense de Seguro Social.
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 CCSS - Todos los derechos reservados</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 12,
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
    maxWidth: 320,
  },
  infoBox: {
    backgroundColor: '#e6f4ea',
    borderRadius: 12,
    padding: 20,
    marginVertical: 24,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    width: '100%',
    maxWidth: 380,
  },
  infoTitle: {
    fontWeight: 'bold',
    color: COLORS.primary,
    fontSize: 18,
    marginBottom: 6,
    textAlign: 'center',
  },
  infoText: {
    color: COLORS.text,
    fontSize: 15,
    textAlign: 'center',
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    color: '#888',
    fontSize: 13,
    textAlign: 'center',
  },
});
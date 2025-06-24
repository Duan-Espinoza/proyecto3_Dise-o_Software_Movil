import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect } from 'react';
import HeaderLogo from '../components/HeaderLogo';
import { registerForPushNotificationsAsync } from '../utils/notifications';
import { COLORS } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeTab() {
  const router = useRouter();

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: COLORS.background }}>
      <View style={styles.headerContainer}>
        <HeaderLogo />
        <Text style={styles.title}>Bienvenido(a) a la app CCSS</Text>
        <Text style={styles.subtitle}>
          Tu acceso móvil a documentos, noticias y blogs institucionales.
        </Text>
      </View>

      <View style={styles.quickAccessRow}>
        <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/noticias')}>
          <Ionicons name="newspaper-outline" size={36} color={COLORS.primary} />
          <Text style={styles.quickTitle}>Noticias</Text>
          <Text style={styles.quickDesc}>Actualidad institucional</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/documentos')}>
          <Ionicons name="document-text-outline" size={36} color={COLORS.primary} />
          <Text style={styles.quickTitle}>Documentos</Text>
          <Text style={styles.quickDesc}>PDFs oficiales</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/blogs')}>
          <Ionicons name="book-outline" size={36} color={COLORS.primary} />
          <Text style={styles.quickTitle}>Blogs</Text>
          <Text style={styles.quickDesc}>Opinión y análisis</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>🩺 Información Importante</Text>
        <Text style={styles.infoText}>
          Mantente al día con las últimas noticias, accede a documentos oficiales y explora los blogs de la Caja Costarricense de Seguro Social.
        </Text>
      </View>

      <View style={styles.sectionCard}>
        <Ionicons name="shield-checkmark-outline" size={28} color={COLORS.primary} style={{ marginBottom: 8 }} />
        <Text style={styles.sectionTitle}>¿Qué puedes hacer aquí?</Text>
        <View style={styles.bulletList}>
          <Text style={styles.bullet}>• Consultar y descargar documentos oficiales en PDF.</Text>
          <Text style={styles.bullet}>• Leer noticias institucionales actualizadas.</Text>
          <Text style={styles.bullet}>• Explorar blogs de expertos y colaboradores.</Text>
          <Text style={styles.bullet}>• Recibir notificaciones importantes.</Text>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Ionicons name="information-circle-outline" size={28} color={COLORS.primary} style={{ marginBottom: 8 }} />
        <Text style={styles.sectionTitle}>¿Quiénes somos?</Text>
        <Text style={styles.aboutText}>
          La Caja Costarricense de Seguro Social es la institución líder en salud y seguridad social de Costa Rica. Esta app te conecta con la información más relevante y confiable, estés donde estés.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 CCSS - Todos los derechos reservados</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
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
  quickAccessRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginBottom: 18,
    marginTop: 8,
    gap: 8,
  },
  quickCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 18,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    minWidth: 90,
  },
  quickTitle: {
    fontWeight: 'bold',
    color: COLORS.primary,
    fontSize: 15,
    marginTop: 8,
    marginBottom: 2,
  },
  quickDesc: {
    color: COLORS.text,
    fontSize: 13,
    textAlign: 'center',
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
    width: '92%',
    alignSelf: 'center',
    maxWidth: 400,
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
  sectionCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 18,
    marginHorizontal: 16,
    marginBottom: 18,
    alignItems: 'flex-start',
    shadowColor: COLORS.primary,
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: COLORS.primary,
    fontSize: 17,
    marginBottom: 8,
  },
  bulletList: {
    marginLeft: 8,
    marginBottom: 4,
  },
  bullet: {
    color: COLORS.text,
    fontSize: 15,
    marginBottom: 2,
  },
  aboutText: {
    color: COLORS.text,
    fontSize: 15,
    textAlign: 'left',
    marginBottom: 4,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  footerText: {
    color: '#888',
    fontSize: 13,
    textAlign: 'center',
  },
});